# Careers Search Live-Coding Task

## Set up the project

Use Python 3.10 or newer. From this project directory, create a virtual environment:

```text
Windows:       py -m venv .venv
macOS/Linux:   python3 -m venv .venv
```

Activate the environment in your shell:

| Shell | Activation command |
| --- | --- |
| Windows PowerShell | `.\.venv\Scripts\Activate.ps1` |
| Windows Command Prompt | `.\.venv\Scripts\activate.bat` |
| macOS/Linux (bash or zsh) | `source .venv/bin/activate` |

Install the test dependencies after activation:

```sh
python -m pip install -r requirements.txt
python -m playwright install chromium
```

## Start the local server

With the virtual environment activated, run:

```sh
python server.py
```

Open `http://127.0.0.1:8000/careers`. Keep the server running while using the page or running the test. Press `Ctrl+C` in the server terminal to stop it.

## Candidate task

`test_careers.py` is a starter smoke test that opens the careers page and accepts the cookie prompt. Complete it to verify that searching for `QA` leaves only QA-related positions in the results.

## Run the starter test

Open a second terminal in the project directory, activate `.venv` using the command for your shell above, then run:

```sh
python -m pytest test_careers.py
```

## Troubleshooting

- **Port 8000 is already in use:** If this server is running in another terminal, stop it there with `Ctrl+C`. Otherwise, find the process using the port and stop it only if it is an old instance of this project.

  Windows PowerShell:

  ```powershell
  Get-NetTCPConnection -LocalPort 8000 -State Listen | Select-Object -ExpandProperty OwningProcess
  Get-Process -Id <PID>
  Stop-Process -Id <PID>
  ```

  macOS/Linux:

  ```sh
  lsof -nP -iTCP:8000 -sTCP:LISTEN
  kill <PID>
  ```

  Replace `<PID>` with the process ID reported by the first command. Then start the server again.
- **The careers page does not load:** Confirm that `python server.py` is still running and open `http://127.0.0.1:8000/careers`.
- **Playwright reports that its browser is missing:** With `.venv` activated, run `python -m playwright install chromium`.
