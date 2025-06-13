export function UppercaseFirstWord(text: String) {
    return text.replace(/^./, (match) => match.toUpperCase())
}