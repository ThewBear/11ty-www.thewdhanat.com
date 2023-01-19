#! /bin/sh
set -euo pipefail

apt update
apt install -y texlive-full latexmk
apt clean autoclean && apt autoremove -y

rm -rf /var/lib/apt/lists/* 
