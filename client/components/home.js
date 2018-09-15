import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'

const tileData = [
  {
    img: '/images/grid-list/tea1.jpg',
    title: 'Tea1',
    cols: 2,
    featured: true
  },
  {
    img: '/images/grid-list/tea2.jpg',
    title: 'Tea2'
  },
  {
    img: '/images/grid-list/tea3.jpg',
    title: 'Tea3'
  },
  {
    img: '/images/grid-list/tea4.jpg',
    title: 'Tea4',
    featured: true
  },
  {
    img: '/images/grid-list/tea5.jpg',
    title: 'tea5'
  },
  {
    img: '/images/grid-list/tea6.jpg',
    title: 'tea6'
  },
  {
    img: '/images/grid-list/tea7.jpg',
    title: 'tea7',
    cols: 2
  }
]
const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: 1200,
    height: 900
  }
})

export const Home = props => {
  const {classes} = props

  return (
    <div className={classes.root}>
      <GridList cellHeight={300} className={classes.gridList} cols={3}>
        {tileData.map(tile => (
          <GridListTile key={tile.img} cols={tile.cols || 1}>
            <img src={tile.img} alt={tile.title} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  )
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Home)
