#! /bin/sh
apt update
apt install -y texlive-full latexmk
apt clean autoclean && apt autoremove -y

rm -rf /var/lib/apt/lists/* 

wget -O ~/Sarabun.zip https://fonts.google.com/download?family=Sarabun
unzip ~/Sarabun.zip -d ~/.fonts/
echo '$xelatex = "xelatex -shell-escape";' >> ~/.latexmkrc
