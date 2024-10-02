import React from 'react';
import { Container, Nav, Navbar, Button, Row, Col, Card, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from './assets/l.png';
import bg from './assets/bg.jpg';
import a from './assets/vitaminA.jpg';
import b from './assets/vitaminB.jpg';
import c from './assets/vitaminC.jpg';
import vitamin from './assets/file.png';
import pd from './assets/pd.jpg';
import vd from './assets/vd.jpg';
import qz from './assets/qz.jpg';







function Home() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <>
      {/* Internal CSS with a professional and modern design */}
      <style>{`
        body {
          font-family: 'Arial', sans-serif;
          background-color: #f4f7f9;
          margin: 0;
          padding: 0;
        }
        .navbar {
          background: rgba(28, 61, 90, 0.8) !important; /* Semi-transparent dark blue */
        }
        .navbar-brand img {
          height: 60px; /* Increased logo size */
          margin-right: 10px;
        }
        .navbar-nav .nav-link {
          color: #ffffff !important;
          font-weight: 500;
          margin: 0 15px;
        }
        .navbar-nav .nav-link:hover {
          text-decoration: underline;
        }
        .hero-section {
          height: 60vh;
          background: linear-gradient(rgba(28, 61, 90, 0.8), rgba(28, 61, 90, 0.8)), url(${bg}) no-repeat center center/cover;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          text-align: center;
          padding: 0 20px;
        }
        .hero-section h1 {
          font-size: 3rem;
          margin-bottom: 15px;
          font-weight: bold;
        }
        .hero-section p {
          font-size: 1.25rem;
          max-width: 600px;
          margin: auto;
        }
        .section-title {
          color: #1c3d5a;
          font-weight: bold;
          margin: 30px 0;
          text-align: center;
        }
        .carousel-item img {
          width: 100%;
          height: 400px;
          object-fit: cover;
          border-radius: 10px;
        }
        .btn-custom {
          background-color: #0069d9;
          border: none;
          color: white;
          padding: 10px 25px;
          border-radius: 4px;
          font-size: 1rem;
          transition: background-color 0.3s ease;
        }
        .btn-custom:hover {
          background-color: #004a9f;
        }
        .card {
          border: none;
          border-radius: 10px;
          transition: transform 0.3s ease;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          overflow: hidden;
        }
        .card:hover {
          transform: translateY(-5px);
        }
        .card img {
          height: 200px;
          object-fit: cover;
        }
        .card-body {
          padding: 20px;
        }
        footer {
          background-color: #343a40;
          padding: 20px;
          color: white;
          text-align: center;
        }
        footer p {
          margin: 0;
          color: #d3dbe4;
        }
          .text-justify {
  text-align: justify;
}

        
        .carousel-caption {
          background-color: rgba(0, 0, 0, 0.5);
          padding: 20px;
          border-radius: 5px;
        }
        .carousel-caption h3,
        .carousel-caption p {
         color: white;
         text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
        }

</style>

      `}</style>

      {/* Navbar */}
     {/* Navbar */}
<Navbar expand="lg" className="navbar sticky-top">
  <Container>
    <Navbar.Brand href="/">
      <img src={logo} alt="Vitaguide Logo" />
      <span style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>VitaGuide</span>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/personal-details">Personal Details</Nav.Link>
        <Nav.Link href="/vitamin-form">Vitamin Deficiencies</Nav.Link>
        <Nav.Link href="/quizzes">Quizzes</Nav.Link>
        <Nav.Link href="/feedback-form">Feedback</Nav.Link>
      </Nav>
      <div className="d-flex">
        <Button href="/login" className="btn-custom me-2">Login</Button>
        <Button href="/signup" className="btn-custom">Sign Up</Button>
      </div>
    </Navbar.Collapse>
  </Container>
</Navbar>


      {/* Hero Section */}
      <div className="hero-section">
        <div>
          <h1>Welcome{user ? `, ${user.email}` : ''}!</h1>
          <p>Your comprehensive guide to improving your child's nutrition through tailored insights and actionable guidance.</p>
        </div>
      </div>

      {/* Why Vitaguide Section */}
<Container className="mt-5">
  <h2 className="section-title">Why Vitaguide?</h2>
  <Row className="align-items-center">
    <Col md={6}>
      <p className="text-justify">
        Vitaguide provides personalized solutions to manage vitamin deficiencies in children by integrating
        technology and health insights to offer real-time advice and dietary guidance. Our platform not only
        identifies deficiencies but also suggests targeted dietary changes, helping parents ensure their children
        receive the essential nutrients necessary for healthy growth and development.
        With Vitaguide, you can easily track your child's vitamin intake, receive reminders for dietary adjustments,
        and access a wealth of resources on nutrition. Our user-friendly interface allows parents to quickly
        understand the nutritional needs of their children and make informed decisions about their diets.
        Join our community and embark on a journey towards better nutrition! Sign up today and take the first
        step towards ensuring a healthier future for your child.
      </p>
    </Col>
    <Col md={6}>
      <img
        src={vitamin}
        alt="Healthy Eating"
        className="img-fluid rounded"
        style={{ maxHeight: '400px', objectFit: 'cover' }}
      />
    </Col>
  </Row>
</Container>


      {/* Vitamins Carousel Section */}
      <Container className="mt-5">
        <h2 className="section-title">Key Vitamins</h2>
        <Carousel>
          <Carousel.Item>
            <img className="d-block w-100" src={a} alt="Vitamin A" />
            <Carousel.Caption>
              <h3>Vitamin A</h3>
              <p>Essential for eye health, immune function, and supporting skin integrity. A must-have for every growing child!</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={b} alt="Vitamin B" />
            <Carousel.Caption>
              <h3>Vitamin B</h3>
              <p>Important for energy production, brain health, and cell metabolism. Keep your child energized and focused!</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={c} alt="Vitamin C" />
            <Carousel.Caption>
              <h3>Vitamin C</h3>
              <p>Vital for skin health, tissue repair, and boosting the immune system. A key player in your child's overall health!</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Container>

      


      {/* Cards Section for Main Actions */}
      <Container className="mt-5">
        <h2 className="section-title">Get Started</h2>
        <Row>
          <Col md={4}>
            <Card className="mb-4">
              <Card.Img variant="top" src={pd} />
              <Card.Body>
                <Card.Title>Personal Details</Card.Title>
                <Card.Text>
                  Fill in your child's personal details to receive customized dietary advice tailored to their specific needs.
                </Card.Text>
                <Button href="/personal-details" className="btn-custom">Fill Personal Details</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-4">
              <Card.Img variant="top" src={vd} />
              <Card.Body>
                <Card.Title>Vitamin Deficiencies</Card.Title>
                <Card.Text>
                  Assess your child's vitamin intake and identify potential deficiencies to improve their health and vitality.
                </Card.Text>
                <Button href="/vitamin-form" className="btn-custom">Check Deficiencies</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-4">
              <Card.Img variant="top" src={qz} />
              <Card.Body>
                <Card.Title>Quizzes</Card.Title>
                <Card.Text>
                  Engage your child with fun quizzes to enhance their understanding of nutrition and the importance of vitamins.
                </Card.Text>
                <Button href="/quizzes" className="btn-custom">Take Quizzes</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Feedback Section */}
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={8} lg={6} className="text-center">
            <h2 className="section-title">Feedback</h2>
            <p>
              Help us improve Vitaguide by providing your valuable feedback. Your opinions will help us enhance the platform.
            </p>
            <Button href="/feedback-form" className="btn-custom">Give Feedback</Button>
          </Col>
        </Row>
      </Container><br />


      {/* Footer Section */}
      <footer>
        <p>&copy; 2024 Vitaguide. All Rights Reserved.</p>
      </footer>
    </>
  );
}

export default Home;
