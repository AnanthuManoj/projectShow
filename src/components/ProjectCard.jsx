import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import projectImage from '../Assets/project.png';
import { BASE_URL } from '../services/baseUrl';

function ProjectCard({projects}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
        <div className='mb-5'>
           <Card  className='shadow rounded btn ' onClick={handleShow}>
           <Card.Img variant="top" src={projects?`${BASE_URL}/upload/${projects.projectImage}`:projectImage} />
           <Card.Body>
            <Card.Title className='fw-bold'>{projects.title}</Card.Title>
          </Card.Body>
        </Card>

        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{projects.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <Row className='d-flex align-items-center'>
            <Col sm={6}>
              <img  src={projects?`${BASE_URL}/upload/${projects.projectImage}`:projectImage} alt="no image" width={'100%'} />
            </Col>
            <Col sm={6}>
                <h3 className='text-info fw-bold'>Description</h3>
              <p>{projects.overview}</p>
              <p >
              <span className='fw-bold'> Language used </span>: {projects.language}
              </p>
            </Col>
           </Row>
        </Modal.Body>
     
          <div className='border-top p-2 fs-3 '>
            <a href={projects.github} target='_blank'><i class="fa-brands fa-github me-3 text-info"></i></a>
            <a href={projects.website} target='_blank'><i class="fa-solid fa-link text-info"></i></a>
          </div>
      
      </Modal>
      </div>
    </div>
  )
}

export default ProjectCard