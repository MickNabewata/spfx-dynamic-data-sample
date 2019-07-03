## About this repository

This repository shows sample code for working with spfx dynamic data.  
This package produces the following:

* simpleStringProvider - web part that provide a dynamic data of simple string value.
* simpleObjectProvider - web part that provide two dynamic data of custom type value.
* simpleStringViewer - web part displaying a dynamic data value using PropertyPaneDynamicFieldSet.
* customObjectViewer - web part displaying a dynamic data value without using PropertyPaneDynamicFieldSet.

### Building the code

```bash
git clone https://github.com/MickNabewata/spfx-dynamic-data-sample.git
npm i
gulp serve
```

### Web parts overview

#### simpleStringProvider

Very simple textbox web part.  
This web part exposes textbox value as dynamic data named '単純文字列'.  
  
![simpleStringProvider](https://cdn-ak.f.st-hatena.com/images/fotolife/m/micknabewata/20190703/20190703155334.png "simpleStringProvider")

#### simpleObjectProvider

Multi textbox web part.  
This web part exposes textbox values as two dynamic datas named 'オブジェクト1' and 'オブジェクト2'.  
  
![simpleObjectProvider](https://cdn-ak.f.st-hatena.com/images/fotolife/m/micknabewata/20190703/20190703155343.png "simpleObjectProvider")

#### simpleStringViewer

Simple web part that showes a selected dynamic data as string value.  
  
![simpleStringViewer](https://cdn-ak.f.st-hatena.com/images/fotolife/m/micknabewata/20190703/20190703155337.png "simpleStringViewer")
  
This web part uses PropertyPaneDynamicFieldSet.  
  
So you should choice one of the field when the dynamic data provides a object value.  
![simpleStringViewer](https://cdn-ak.f.st-hatena.com/images/fotolife/m/micknabewata/20190703/20190703155340.png "simpleStringViewer")

#### customObjectViewer

This web part showes a selected dynamic data value without using PropertyPaneDynamicFieldSet.  
You should choice a dynamic datasource and a property in web part setting window,  
and don't need to choose the field.  
  
![customObjectViewer](https://cdn-ak.f.st-hatena.com/images/fotolife/m/micknabewata/20190703/20190703155346.png "customObjectViewer")