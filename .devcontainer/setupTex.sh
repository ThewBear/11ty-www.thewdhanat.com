#! /bin/sh
set -euo pipefail

wget -O ~/Sarabun.zip https://fonts.google.com/download?family=Sarabun
unzip ~/Sarabun.zip -d ~/.fonts/
echo '$xelatex = "xelatex -shell-escape";' >> ~/.latexmkrc
