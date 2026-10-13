from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent
BUILD_ROOT = PROJECT_ROOT / 'build' / 'web'
ROOT = BUILD_ROOT if BUILD_ROOT.exists() else PROJECT_ROOT / 'web'

class PortfolioHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

if __name__ == '__main__':
    ThreadingHTTPServer(('0.0.0.0', 3000), PortfolioHandler).serve_forever()
