import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Chip, CircularProgress, Typography } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPick } from "../../store/slices/moviePicksSlice";
import { RootState } from "../../store/store";
import { LoadingState } from "../../utilities/LoadingState";

export const MovieDetailsCard = React.forwardRef((_, __) => {
    const movieDetails = useSelector((state: RootState) => state.movieDetails);
    const moviePicks = useSelector((state: RootState) => state.moviePicks.value);

    const dispatch = useDispatch();

    return (
        <div>
            {
                movieDetails.loading === LoadingState.pending ?
                <CircularProgress />
                : movieDetails.value ?
                <Box mx="auto">
                    <Card className='movie-details'>
                        <div className="info">
                            <CardActionArea>
                                <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {movieDetails.value.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {movieDetails.value.synopsis}
                                </Typography>
                                <Typography className="actors" variant="body2" color="textSecondary" component="div">
                                    {movieDetails.value.actors.slice(0, 3).map(actor => <Chip key={actor} variant="outlined" color="secondary" size="small" label={actor} />)}
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                {
                                    moviePicks.includes(movieDetails.value.title) ? '⭐' :
                                    <Button size="small" color="primary" onClick={() => dispatch(setPick(movieDetails!.value!.title))}>
                                        Ajouter aux favoris
                                    </Button>
                                }
                            </CardActions>
                        </div>
                        <CardMedia
                            className='movie-details-poster'
                            image={movieDetails.value.poster}
                            title={movieDetails.value.title + ' poster'}
                        />
                    </Card>
                </Box>
                : <div></div>
            }
        </div>
    );
})