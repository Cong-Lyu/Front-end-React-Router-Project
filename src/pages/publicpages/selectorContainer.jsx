import styles from './selectorContainer.module.css'
import { Link } from 'react-router-dom'

export function SelectorContainer(props) {
  const num = props['selectorNum']
  const selectors = ['anime', 'domestic', 'cartoon', 'dancing', 'tech', 'food', 'cars', 'sports', 'films', 'tv series', 'games', 'music', 'movies', 'knowledge', 'news', 'theatre', 'make-up', 'more']

  function selectorBuilder() {
    let i = 0;
    const selectorList = []
    //------below only builds up (num - 1) elements of the total------//
    for(i; i < num - 1; i++) {
      selectorList.push(<Link className={styles.option} to={selectors[i]}>{selectors[i]}</Link>)
    }
    selectorList.push(<Link className={styles.option} to='more'>more</Link>)

    return selectorList
  }

  return (
    <>
      <div className={styles.selectorContainer}>
        {selectorBuilder()}
      </div>
    </>
  )
}