import React from 'react'
import {Link} from 'react-router-dom'
import GradeIcon from '@material-ui/icons/Grade'
import PropTypes from 'prop-types'
import AddShoppingCardIcon from '@material-ui/icons/AddShoppingCart'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import {withStyles} from '@material-ui/core/styles'

const styles = theme => ({
  icon: {
    marginRight: theme.spacing.unit * 2
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  cardMedia: {
    paddingTop: '56.25%' // 16:9
  },
  cardContent: {
    flexGrow: 1
  }
})

const ProductDisplay = props => {
  const {classes} = props
  const product = props.product
  const rating = Math.floor(
    product.reviews.reduce((sum, review) => sum + review.rating, 0) /
      product.reviews.length
  )
  let grades = []
  if (!rating) {
    grades.push(
      <Typography style={{height: '29px', color: 'gray'}}>
        Be the first to review!
      </Typography>
    )
  } else {
    for (let i = 0; i < rating; ++i) {
      grades.push(<GradeIcon />)
    }
  }

  return (
    <Card className={classes.card}>
      <Link to={`/products/${product.id}`}>
        <CardMedia
          className={classes.cardMedia}
          image={`/${product.imageUrl}`}
        />
        <CardContent className={classes.cardContent}>
          <Typography
            gutterBottom
            variant="headline"
            component="h2"
            style={{fontFamily: 'Satisfy'}}
          >
            {product.title}
          </Typography>
          <Typography>${(product.price / 100).toFixed(2)}</Typography>
          <Typography style={{marginTop: '1em'}}>{grades}</Typography>
        </CardContent>
      </Link>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => props.addToCart(product, props.user)}
        >
          <AddShoppingCardIcon style={{paddingRight: '0.2em'}} /> Add to cart!
        </Button>
      </CardActions>
    </Card>
  )
}

ProductDisplay.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ProductDisplay)
