import {useEffect, useRef} from 'react';
import api from '../../api/axiosConfig';
import {useParams} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';

import React from 'react'

const Reviews = ({getMovieData,movie,reviews,setReviews}) => {

    const revText = useRef();
    let params = useParams();
    const movieId = params.movieId;

    useEffect(()=>{
        getMovieData(movieId);
    },[movieId])

    const addReview = async (e) =>{
        e.preventDefault();

        const rev = revText.current.value;
        //const rev = revText.current;

        if (!rev) {
            alert("Please write a review before submitting!");
            return;
        }
        try
        {
            const response = await api.post("/api/v1/reviews",{reviewBody:rev,imdbId:movieId});

            //const updatedReviews = [...reviews, {body:rev.value}];
            const newReview = { body: rev };
            const updatedReviews = [...reviews, newReview ];

    
            //rev.value = "";
            revText.current.value = "";
    
            setReviews(updatedReviews);
        }
        catch(err)
        {
            console.error(err);
        }
        



    }

  return (
    <Container>
        <Row>
            <Col><h3>Reviews</h3></Col>
        </Row>
        <Row className="mt-2">
            <Col>
                <img src={movie?.poster} alt="" />
            </Col>
            <Col>
                {
                    <>
                        <Row>
                            <Col>
                                <ReviewForm handleSubmit={addReview} revText={revText} labelText = "Write a Review?" />  
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr />
                            </Col>
                        </Row>
                    </>
                }
                
                {
                    <div>
                    <h4>All Reviews:</h4>
                    <br/>
                    {reviews?.length > 0 ? (
                      reviews.map((r, index) => (
                        <div key={index}>
                          <Row>
                            <Col>{r.body}</Col>
                          </Row>
                          <Row>
                            <Col>
                              <hr />
                            </Col>
                          </Row>
                        </div>
                      ))
                    ) : (
                      <p>No reviews yet. Be the first to review!</p>
                    )}
                  </div>
                }
            </Col>
        </Row>
        <Row>
            <Col>
                <hr />
            </Col>
        </Row>        
    </Container>
  )
}

export default Reviews