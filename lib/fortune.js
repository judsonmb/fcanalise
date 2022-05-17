const fortuneCookies = [
    "Conquiste seus medos ou eles vão conquistar você.",
    "Os rios precisam de nascentes.",
    "Não tema o que você não conhece.",
    "Você terá uma agradável surpresa.",
    "Sempre que possível, mantenha-o simples."
]

exports.getFortune = () => {
    const idx = Math.floor(Math.random()*fortuneCookies.length)
    return fortuneCookies[idx]
}