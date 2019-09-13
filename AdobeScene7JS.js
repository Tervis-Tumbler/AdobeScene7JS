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

export function Out_AdobeScene7URLPrettyPrint ({
    $URL
}) {
    var $URLDecoded = $URL
        .replace(/%26/g,"&")
        .replace(/%27/g,"'")
        .replace(/%3f/g,"?")
        .replace(/%7b/g,"{")
        .replace(/%7d/g,"}")

    var $URLPrettyPrinted = ""
    var $CharactersToBreakAfter = ["?"]
    var $CharactersToBreakBefore = ["&"]
    var $CharactersToIndentOn = ["{","("]
    var $CharactersToUnindentOn = ["}",")"]
    var $IndentionLevel = 0

    for (var $Character of  [...$URLDecoded]) {
        if ($CharactersToBreakAfter.includes($Character)) {
            $URLPrettyPrinted += `${$Character}\n`
            $URLPrettyPrinted += "    ".repeat($IndentionLevel)
        } else if ($CharactersToBreakBefore.includes($Character)) {
            if (![" ","\n"].includes([...$URLPrettyPrinted].slice(-1)[0])) {
                $URLPrettyPrinted += "\n"
                $URLPrettyPrinted += "    ".repeat($IndentionLevel)
            }
            $URLPrettyPrinted += $Character
        } else if ($CharactersToIndentOn.includes($Character)) {
            $URLPrettyPrinted += `${$Character}\n`
            $IndentionLevel += 1
            $URLPrettyPrinted += "    ".repeat($IndentionLevel)
        } else if ($CharactersToUnindentOn.includes($Character)) {
            $IndentionLevel -= 1
            $URLPrettyPrinted += "\n"
            $URLPrettyPrinted += "    ".repeat($IndentionLevel)
            $URLPrettyPrinted += $Character
        } else {
            $URLPrettyPrinted += $Character
        }
    }
    return $URLPrettyPrinted
}