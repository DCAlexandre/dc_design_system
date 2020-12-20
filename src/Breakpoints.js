// import React from 'react'
import facepaint from 'facepaint'

// const breakpoints = [
// 	320, // Smartwatches and small smartphones // yellow
// 	576, // Small tablets and large smartphones (landscape view) // tomato
// 	768, // Small tablets (portrait view) // lightgreen
// 	992, // Tablets and small desktops // royalblue
// 	1200 // Large tablets and desktops // coral
// ]

// const mq = breakpoints.map(
// 	bp => `@media (min-width: ${bp}px)`
// )

const mq = facepaint([
	'@media(min-width: 320px)', // Smartwatches and small smartphones // yellow
	'@media(min-width: 576px)', // Small tablets and large smartphones (landscape view) // tomato
	'@media(min-width: 768px)', // Small tablets (portrait view) // lightgreen
	'@media(min-width: 992px)', // Tablets and small desktops // royalblue
	'@media(min-width: 1200px)' // Large tablets and desktops // coral
])
// const bp = {mq}

export default mq
// export default Breakpoints

/*
Je voudrais utiliser Facepaint qui rend l'utilisation des media queries
beaucoup plus light mais qui ne fonctionne qu'avec les styles
en objet, cf. https://emotion.sh/docs/media-queries
*/
