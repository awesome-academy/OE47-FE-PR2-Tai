import React, { useEffect, useState } from "react";
import {
    Container,
    Row,
    Image,
    Button,
    Col,
    Card,
    Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
    getAllCineplexsAction,
    getCineplexItemAction,
} from "../../redux/actions/cineplexActions";
import { getCineplexsSelector } from "../../redux/selectors/cineplexSelector";
import "./style.scss";

function Cineplex() {
    const cineplexs = useSelector(getCineplexsSelector);
    const dispatch = useDispatch();
    const [active, setActive] = useState(0);

    useEffect(() => {
        dispatch(getAllCineplexsAction());
        return () => {
            dispatch({
                type: "REMOVE_CINEPLEXS",
            });
        };
    }, [dispatch]);

    const showCineplexItem = (e, i) => {
        setActive(i);
        const cineplexId = parseInt(e.target.id);
        dispatch(getCineplexItemAction(cineplexId));
    };

    return (
        <Container>
            <Row>
                <h1 className="movie__title">Danh sách rạp chiếu phim</h1>
            </Row>
            <Row>
                <div className="d-flex flex-wrap mt-2 cineplex__list">
                    {cineplexs.data.map((cineplex, i) => {
                        return (
                            <Button
                                key={i}
                                variant="outline-dark"
                                id={cineplex.id}
                                onClick={() => showCineplexItem(i)}
                                className={
                                    i === active
                                        ? "mb-3 me-3 active"
                                        : "mb-3 me-3"
                                }
                            >
                                {cineplex.name}
                            </Button>
                        );
                    })}
                </div>
            </Row>
            {Object.keys(cineplexs.item).length === 0 ? (
                <Spinner />
            ) : (
                <>
                    <Row>
                        <div className="text-center cineplex__header">
                            <h3>
                                Cơ Sở : <span>{cineplexs.item.name}</span>
                            </h3>
                            <h3>
                                Địa chỉ : <span>{cineplexs.item.address}</span>
                            </h3>
                            <Image src={cineplexs.item.image} thumbnail />
                        </div>
                    </Row>
                    <h1 className="movie__title my-3">Danh sách rạp chiếu</h1>
                    <Row>
                        {cineplexs.item.Cinemas.map((item, index) => (
                            <Col key={index} lg={4} md={6} sm={12} xs={12}>
                                <Card className="mb-4">
                                    <Card.Body>
                                        <Card.Title className="fw-bold">
                                            Rạp {index + 1}&nbsp;:&nbsp;
                                            {item.name}
                                        </Card.Title>
                                        <Card.Text className="fw-bold my-3">
                                            Số ghế&nbsp;:&nbsp;
                                            <span className="fw-light">
                                                {item.vertical_size *
                                                    item.horizontal_size}
                                            </span>
                                        </Card.Text>
                                        <Card.Text className="fw-bold">
                                            Trạng thái&nbsp;:&nbsp;
                                            <span className="fw-light">
                                                Sẵn sàng
                                            </span>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </>
            )}
        </Container>
    );
}

export default Cineplex;
