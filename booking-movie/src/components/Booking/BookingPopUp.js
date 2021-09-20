import moment from "moment";
import React, { useState } from "react";
import { Form, Row, Button } from "react-bootstrap";
import CryptoJS from "crypto-js";
import { useDispatch } from "react-redux";
import { getMovieShowtimesAction } from "../../redux/actions/movieActions";
import { Link } from "react-router-dom";

function BookingPopUp(props) {
    const { movieId, data } = props;
    const dispatch = useDispatch();
    const [active, setActive] = useState(0);

    const timeFrom = (x) => {
        let dates = [];
        for (let i = 0; i < Math.abs(x); i++) {
            const timeCal = (x >= 0 ? i : -i) * 24 * 60 * 60 * 1000;
            const time = new Date().getTime();
            const day = new Date(time - timeCal).toISOString();

            dates.push(moment(day).format());
        }
        return dates;
    };

    const days = timeFrom(-9);

    const onChangeDay = (value, index) => {
        setActive(index);

        dispatch({
            type: "GET_MOVIE_SHOWTIMES_FAIL",
        });

        dispatch(
            getMovieShowtimesAction(movieId, {
                day: value,
            })
        );
    };

    return (
        <Form>
            <Row>
                <Form.Group>
                    <div className="row row-cols-auto mx-auto d-flex justify-content-between">
                        {days.map((day, index) => {
                            return (
                                <Button
                                    key={index}
                                    onClick={() =>
                                        onChangeDay(
                                            moment(day).format("YYYY-MM-DD"),
                                            index
                                        )
                                    }
                                    variant="outline-danger"
                                    className={active === index ? "active" : ""}
                                >
                                    <p>
                                        {moment(day).format("ddd")}/
                                        {moment(day).format("D")}/
                                        {moment(day).format("M")}
                                    </p>
                                </Button>
                            );
                        })}
                    </div>
                    <hr className="my-3" />
                </Form.Group>
                {data.map((item, index) =>
                    item.showtimes.length > 0 ? (
                        <Form.Group key={index}>
                            <strong>{item.name}</strong>
                            <div className="text-center">
                                <div className="d-flex flex-wrap">
                                    {item.showtimes.map((showtime) => {
                                        const hashId =
                                            CryptoJS.MD5(
                                                showtime.start_time
                                            ).toString() + showtime.id;
                                        return (
                                            <Link
                                                to={`/booking/tickets/${hashId}`}
                                                key={showtime.id}
                                                className="btn btn-outline-danger"
                                            >
                                                <div id={showtime.id}>
                                                    {moment(
                                                        showtime.start_time
                                                    ).format("HH:mm A")}
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        </Form.Group>
                    ) : index === 0 ? (
                        "Không có lịch chiếu"
                    ) : (
                        ""
                    )
                )}
            </Row>
        </Form>
    );
}

export default BookingPopUp;
