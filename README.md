# 원페이지 PDF한장 출력하기

일정한 규격(Puppeteer)으로 압축한(Ghostscript) PDF 다운로드 스크립트

## 목표(Goal)

홈페이지에 쓴 이력서를 PDF한장으로 출력함.

## 설치(install)

```shell
// install repo
$ git clone https://github.com/Seunghyum/onePagePDFDownload-Puppeteer-Ghostscript.git

// install ghostscript
$ brew install ghostscript // for Mac
$ apt-get install ghostscript libgs-dev // for Debian
$ yum install ghostscript ghostscript-devel // for Red Hat | Fedora

// 경로 설정 - 참고 : https://www.npmjs.com/package/ghostscript4js
$ vi ~/.bash_profile 
export GS4JS_HOME="/usr/local/lib" // add this line

// install packages
$ yarn install
```

## 사용법(Usage)

```shell
$ yarn print --URL=your_url

// example
$ yarn print --URL=https://seunghyum.github.io/about
```

## 사용한 라이브러리

- puppeteer : 동일한 규격의 출력을 위한 헤드리스 브라우저
- ghostscript : PDF파일 컴프레서(용량압축)