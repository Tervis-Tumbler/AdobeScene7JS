export function New_AdobeScene7URLWidthAndHeightStanza ({
    $Width,
    $Height,
}) {
    if ($Width && $Height) {
        return `
            &wid=${$Width}
            &hei=${$Height}
        `.replace(/\s/g, "")
    }
}

export function New_AdobeScene7SizeStanza ({
    $Width,
    $Height
}) {
    if ($Width && $Height){
        return `&size=${$Width},${$Height}`
    }
}

export function New_AdobeScene7URL ({
    $Host,
    $Type,
    $RelativeURL,
    $AsScene7SrcValue,
    $ExternalURL
}) {
    if ($AsScene7SrcValue) {
        if ($Type === "ImageServer") {
            return `is{${$RelativeURL}}`
        } else if ($Type === "ImageRender") {
            return `ir{${$RelativeURL}}`
        } else if ($ExternalURL) {
            var $ExternalURLWithoutHttps = $ExternalURL.replace(/^https/i, "http")
            return `{${$ExternalURLWithoutHttps}}`
        }
    } else {
        var $URL
        if ($Type === "ImageServer") {
            $URL = new URL(`https://${$Host}/is/image/${$RelativeURL}`)
        } else if ($Type === "ImageRender") {
            $URL = new URL(`https://${$Host}/ir/render/${$RelativeURL}`)
        }

        var $URLSearchParams = new URLSearchParams($URL.search)
        $URLSearchParams.append('scl', 1)
        $URLSearchParams.append('fmt', 'png-alpha')
        $URL.search = `?${$URLSearchParams.toString()}`
        return decodeURIComponent($URL.href)
    }
}