# STICKIVERSE STUDIO - Development Web Server
# Serves static assets on http://localhost:8085/
# Run in PowerShell: .\server.ps1

$port = 8089
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Prefixes.Add("http://127.0.0.1:$port/")

try {
    $listener.Start()
    Write-Host "==========================================================" -ForegroundColor Cyan
    Write-Host "  STICKIVERSE STUDIO DEV SERVER RUNNING" -ForegroundColor Green
    Write-Host "  Local Address: http://localhost:$port/" -ForegroundColor Yellow
    Write-Host "==========================================================" -ForegroundColor Cyan
    Write-Host "Press [Ctrl+C] to stop the server..."
    
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        # Resolve path
        $url = $request.Url.LocalPath
        
        # Route admin path to stickiverse-admin folder
        $filePath = ""
        if ($url -eq "/admin" -or $url -eq "/admin/") {
            $filePath = Join-Path (Get-Location) "../stickiverse-admin/index.html"
        } elseif ($url.StartsWith("/admin/")) {
            $subUrl = $url.Substring(7) # Strip "/admin/"
            $filePath = Join-Path (Get-Location) "../stickiverse-admin/$subUrl"
        } else {
            if ($url -eq "/") { $url = "/index.html" }
            $url = $url.Replace("..", "").Replace("\", "/")
            $filePath = Join-Path (Get-Location) $url
        }
        
        # If directory, append index.html
        if (Test-Path $filePath -PathType Container) {
            $filePath = Join-Path $filePath "index.html"
        }
        
        if (Test-Path $filePath -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            
            # Determine content type
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $contentType = "application/octet-stream"
            if ($ext -eq ".html" -or $ext -eq ".htm") { $contentType = "text/html; charset=utf-8" }
            elseif ($ext -eq ".css") { $contentType = "text/css; charset=utf-8" }
            elseif ($ext -eq ".js") { $contentType = "application/javascript; charset=utf-8" }
            elseif ($ext -eq ".png") { $contentType = "image/png" }
            elseif ($ext -eq ".jpg" -or $ext -eq ".jpeg") { $contentType = "image/jpeg" }
            elseif ($ext -eq ".svg") { $contentType = "image/svg+xml" }
            elseif ($ext -eq ".xml") { $contentType = "application/xml" }
            elseif ($ext -eq ".txt") { $contentType = "text/plain" }
            
            $response.ContentType = $contentType
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $errorMessage = "404 Not Found"
            $errBytes = [System.Text.Encoding]::UTF8.GetBytes($errorMessage)
            $response.ContentType = "text/plain"
            $response.ContentLength64 = $errBytes.Length
            $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
        }
        $response.Close()
    }
} catch {
    Write-Error $_
} finally {
    $listener.Close()
}
