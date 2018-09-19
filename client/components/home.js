import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'

const tileData = [
  {
    img: '/images/grid-list/BAM.jpg',
    //img: '/images/BAM.jpg',
    title: 'BAM',
    cols: 2,
    featured: true
  },
  {
    img: '/images/grid-list/guy-drinking-tea.jpg',
    title: 'guy-drinking-tea'
  },
  {
    img: '/images/grid-list/teatime.jpg',
    title: 'teatime'
  },
  {
    img: '/images/grid-list/teabag.jpg',
    title: 'teabag',
    featured: true
  },
  {
    img: '/images/grid-list/girl-wand-magic.jpg',
    title: 'girl-wand-magic'
  },
  {
    img: '/images/grid-list/girl-drinking-tea.jpg',
    title: 'girl-drinking-tea'
  },
  {
    img: '/images/grid-list/zap.jpg',
    title: 'zap',
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
