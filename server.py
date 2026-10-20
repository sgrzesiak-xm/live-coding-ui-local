from http import HTTPStatus
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit


STATIC_DIRECTORY = Path(__file__).resolve().parent / "static"
HOST = "127.0.0.1"
PORT = 8000


class CareersRequestHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(STATIC_DIRECTORY), **kwargs)

    def do_GET(self):
        if urlsplit(self.path).path == "/":
            self.send_response(HTTPStatus.FOUND)
            self.send_header("Location", "/careers")
            self.end_headers()
            return

        super().do_GET()

    def translate_path(self, path):
        if urlsplit(path).path in {"/careers", "/careers/"}:
            return str(STATIC_DIRECTORY / "careers.html")

        return super().translate_path(path)


def main():
    address = (HOST, PORT)
    with ThreadingHTTPServer(address, CareersRequestHandler) as server:
        print(f"Serving careers at http://{HOST}:{PORT}/careers (Ctrl+C to stop)", flush=True)
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.", flush=True)


if __name__ == "__main__":
    main()
