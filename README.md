# Word Match Sprint

A fast matching game: pair words with meanings before the timer runs out, and beat your best time.

Part of the [GRE and TOEFL Study Suite](https://github.com/Apurba94/gre-toefl-study-suite): 100 free study apps for the GRE General Test and more. It works offline, as a Windows program or in the browser.

## Download and run

- **Windows:** download `Word Match Sprint.exe` from the [latest release](https://github.com/Apurba94/gre-word-match/releases/latest) and open it. Nothing to install. It opens in its own window and saves your progress in your user folder.
- **Browser:** open it online in the suite's web edition at https://gre-toefl-study-suite.vercel.app/apps/gre-word-match/ . Progress stays in that browser.
- **From source:** `python launcher.py` (Python 3.10 or later, no packages needed).

## What it does

A quick game for the GRE word bank. Six words and six meanings appear. Click a word, then its meaning. Wrong pairs cost two seconds. Beat your best time, and the words you miss are logged for review in the error log.

Sections: Play, Progress, About.

## How to use it

1. Press **New round**.
2. Click a word, then the meaning that matches it.
3. Finish all six pairs to stop the clock.
4. Your best time and missed words are saved.

## Good to know

- All questions, passages and definitions were written for this suite. None are official ETS questions. For official practice, use the materials on ets.org.
- It follows the GRE General Test as shortened in September 2023 and the TOEFL iBT as updated in January 2026. Formats change, so check ets.org before your test.
- Feedback on writing and speaking counts things a program can count honestly, such as length and linking words. It does not give an official score.
- Not endorsed by or affiliated with ETS. GRE and TOEFL are registered trademarks of ETS.

## For developers

The app is plain HTML and JavaScript in `web/`, run by a small Python launcher that serves it on 127.0.0.1 only and needs a secret token for saving. Tests: `node --test "tests/*.test.js"` (23 tests) and `python -m unittest discover -s tests`. Build the .exe with `python build_exe.py`.

Built with AI assistance (Claude Code). MIT licence. By JANIN A APURBA.
