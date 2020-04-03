# mofron-comp-slidemenu
[mofron](https://mofron.github.io/mofron/) is module based frontend framework.

slidemenu component for mofron


# Install
```
npm install mofron mofron-comp-slidemenu
```

# Sample
```html
<require>
    <tag module="mofron-comp-slidemenu">SlideMenu</tag>
    <tag module="mofron-comp-txtframe">TxtFrame</tag>
</require>

<SlideMenu size=2rem,1rem mainColor=#e6e6fa>
    <item>
        <TxtFrame>menu 1</TxtFrame>
        <TxtFrame>menu 2</TxtFrame>
        <TxtFrame>menu 3</TxtFrame>
    </item>
</SlideMenu>
```

# Parameter

| Short<br>Form | Parameter Name | Type | Description |
|:-------------:|:---------------|:-----|:------------|
| | position | string | left: slides from the left side [default] |
| | | | right: slides from the right side |
| | baseColor | mixed(color) | string: background color name, #hex |
| | | | array: [red, green, blue, (alpha)] |
| | | dict | style option |

