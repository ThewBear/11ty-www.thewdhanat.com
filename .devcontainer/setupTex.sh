#! /bin/bash
set -euo pipefail

# Download Sarabun font
curl -s "https://fonts.google.com/download/list?family=Sarabun" > cv/sarabun_metadata_raw.txt
# Remove ")]}'" from the beginning of the file
tail -c +5 cv/sarabun_metadata_raw.txt > cv/sarabun_metadata.json
# Extract the necessary information from the JSON file
file_refs=$(jq -rc '.manifest.fileRefs[]' cv/sarabun_metadata.json)
# Download, save the font file to ~/.fonts
# We use temp fonts directory since curl cannot write directly to ~/.fonts
mkdir -p fonts ~/.fonts
while IFS= read -r file_ref; do
    filename=$(echo "$file_ref" | jq -r '.filename')
    url=$(echo "$file_ref" | jq -r '.url')
    echo $url $filename
    curl "$url" -o "fonts/$filename"
done <<< "$file_refs"
mv fonts/* ~/.fonts
# Clean up
rmdir fonts
rm cv/sarabun_*

# echo '$xelatex = "xelatex -shell-escape";' >> ~/.latexmkrc
