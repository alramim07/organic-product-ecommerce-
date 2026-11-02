$urls = @(
  'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1591073113125-e46713c829ed?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1605027990121-cbae9e0642df?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1518492104633-130d0cc84637?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1587393855524-087f83d95bc9?auto=format&fit=crop&w=600&q=80'
)

$destDir = 'c:\Users\Lyns Romero\Desktop\Projects\ammwala\frontend\public\assets\mangoes'
if (!(Test-Path $destDir)) { New-Item -ItemType Directory -Path $destDir -Force }

$i = 1
foreach ($u in $urls) {
    $dest = Join-Path $destDir "m$i.jpg"
    Write-Host "Downloading $dest ..."
    try {
        Invoke-WebRequest -Uri $u -OutFile $dest -UserAgent 'Mozilla/5.0' -TimeoutSec 15
        $size = (Get-Item $dest).Length
        Write-Host "Saved m$i.jpg: $size bytes"
    } catch {
        Write-Host "Error m$($i): $($_.Exception.Message)"
    }
    $i++
}
