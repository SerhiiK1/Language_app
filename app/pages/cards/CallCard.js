import {Card} from './Card'

export function callCard({navigation}){
    const card = new Card('hello', 'hola')
    return(
        
        card.render()
    )
}
