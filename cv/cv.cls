\LoadClass{article}
\usepackage{fontspec}
\setmainfont{Sarabun}

\usepackage{geometry}
\geometry{
  a4paper,
  left=15mm,
  right=15mm,
  bottom=20mm,
  top=15mm}

\usepackage[]{fancyhdr}
\pagestyle{fancy}
\renewcommand{\headrulewidth}{0pt}
\fancyhf{}
\fancyfoot[L]{
  thewdhanat.com/cv
}
\fancyfoot[C]{\thepage/\pageref{LastPage}}
\fancyfoot[R]{
  \footnotesize
  \input{|"git rev-list --abbrev-commit -1 HEAD \jobname.tex"}
  \\
  \textcolor{gray}{
    \today
  }
}

\usepackage{titlesec}
\titleformat{\section}         % Customise the \section command 
  {\Large\raggedright\bf}  % Make the \section headers large (\Large),
  {}{0em}                      % Can be used to give a prefix to all sections, like 'Section ...'
  {}                           % Can be used to insert code before the heading
  [{\titlerule[0.75pt]}]                 % Inserts a horizontal line after the heading
