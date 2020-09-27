---
title: วิธีใช้ Font ในเครื่องบน Google Docs / Sheets / Slides
slug: how-to-use-local-thai-fonts-in-google-docs-sheets-slides
postLang: th
---

โดยปกติแล้ว เอกสารใน Google Drive ทั้ง Google Docs, Google Sheets และ Google Slides จะสามารถใช้ Font ที่มีอยู่ใน [Google Fonts](https://fonts.google.com/) เท่านั้น ผ่านทางเมนู **More fonts 🔽**

![More fonts in the font menu dropdown](./2020-09-27-google-docs-local-fonts/more-fonts.png)

โดย font ที่รองรับภาษาไทยนั้น คือ [13 fonts แห่งชาติ](https://gsuiteupdates.googleblog.com/2019/02/expanded-thai-fonts-editors.html) ดังนี้

- Bai Jamjuree
- Chakra Petch
- Charm
- Charmonman
- Fahkwang
- Kodchasan
- KoHo
- Krub
- K2D
- Mali
- Niramit
- Sarabun
- Srisakdi

โดยที่ถูกใช้มากที่สุดน่าจะเป็น _Sarabun_ แต่ _Sarabun_ นี้ขนาดตัวอักษร (px) จะไม่ตรงกับ _TH Sarabun PSK_ ที่นิยมใช้ใน Microsoft Word

เราจึงมีอีกวิธีที่สามารถนำบาง fonts ที่มีอยู่ในเครื่องของเรามาใช้ได้ 😇 ภายใต้เงื่อนไขว่า

1. font นั้นเป็น [font ที่ Google **รองรับ**](#Fonts-ที่-Google-รองรับ) ซึ่งแน่นอนว่ารองรับ _TH Sarabun PSK_
1. [ปรับภาษาของเอกสาร](#ปรับภาษาของเอกสาร)เป็นภาษา**ไทย**
1. เครื่องที่เปิดเอกสารนั้น ต้องมี font นั้น**ติดตั้งอยู่** และถ้าไปเปิดเครื่องอื่นที่ไม่มี font นั้นอยู่ เอกสารจะแสดงรูปแบบผิดพลาดได้

## ปรับภาษาของเอกสาร

สำหรับ Google Docs และ Google Slides เลือกเมนู **File** บนซ้าย จากนั้นเปลี่ยน **Language** เป็นไทย

สำหรับ Google Sheets เลือกเมนู **File** บนซ้าย > **Spreadsheet settings** > แท็บ **General** > เปลี่ยน **Locale** เป็นไทย.

## Fonts ที่ Google รองรับ

รองรับทุกภาษา ไม่ต้องปรับภาษาของเอกสาร มีดังนี้

- Arial
- Comic Sans MS
- Courier New
- Georgia
- Impact
- Times New Roman
- Trebuchet MS
- Verdana

สำหรับภาษาไทย มีดังนี้

- Angsana New
- AngsanaUPC
- Browallia New
- BrowalliaUPC
- Cordia New
- CordiaUPC
- DilleniaUPC
- EucrosiaUPC
- FreesiaUPC
- IrisUPC
- JasmineUPC
- KodchiangUPC
- Leelawadee
- LilyUPC
- TH Sarabun PSK
- TH SarabunPSK
- Ayuthaya
- Krungthep
- Sathu
- Silom
- Thonburi
- TH Sarabun OFL

สำหรับภาษาอื่น ดูเพิ่มเติมที่อีก[บทความ](../how-to-use-local-fonts-in-google-docs-sheets-slides/)
