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

\usepackage[dvipsnames,svgnames,x11names]{xcolor}

\usepackage{lastpage}
\usepackage[]{fancyhdr}
\pagestyle{fancy}
\renewcommand{\headrulewidth}{0pt}
\fancyhf{}
\fancyfoot[L]{
  thewdhanat.com/cv
}
\fancyfoot[C]{\thepage/\pageref{LastPage}}
\fancyfoot[R]{\textcolor{Sepia}{\footnotesize
    Version \input{|"git rev-list --abbrev-commit -1 HEAD \jobname.tex"}\\
    Printed on \today
  }}

\usepackage{titlesec}
\titleformat{\section}         % Customise the \section command 
{\Large\raggedright\bf}      % Make the \section headers large (\Large),
{}{0em}                      % Can be used to give a prefix to all sections, like 'Section ...'
{}                           % Can be used to insert code before the heading
[{\titlerule[0.75pt]}]       % Inserts a horizontal line after the heading
\titlespacing*{\section}{0pt}{*2}{*0.75}  % Reduce vertical space after title


\newenvironment{cv_table}{
  \renewcommand{\arraystretch}{1.5}
  \begin{tabular*}{\columnwidth}{ll@{\extracolsep{\fill}}r}
    }{\end{tabular*}}

\newcommand{\cveduitem}[3]{
  #1 & \textcolor{DarkSlateGray}{\textbf{#2}} & #3 \\
}

\newcommand{\cvelecitem}[3]{
  \textcolor{DarkSlateGray}{\textbf{#1}} & #2 & #3 \\
}

\usepackage{enumitem}
\newenvironment{cv_itemize}{
  \vspace{-0.5em}
  \begin{itemize}[leftmargin=*,noitemsep]
    }{\end{itemize}}

\newcommand{\cvitemwithsubtitle}[4]{
  #1 & \textcolor{SlateGray}{#3} & #4 \\[-0.5em]
  \multicolumn{3}{l}{
    \parbox{\columnwidth}{\small{\textcolor{SlateGray}{#2}}}
  } \\
}

\newcommand{\cvonlinecourseitem}[4]{
  \cvitemwithsubtitle{#1}{Online course by #2}{#3}{#4}
}
