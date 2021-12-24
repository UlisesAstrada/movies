import React from 'react'

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';


import { CardActionArea } from '@mui/material';

const style = {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: '#141414',
  border: '2px solid #000',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
  color: "white"
};


const CardAndModal = ({movie}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Card sx={{ maxWidth: 600, backgroundColor: '#141414', color: 'white', border: '2px solid grey', borderRadius: '10px', objectFit: 'contain' }}
        onClick={ handleOpen }
      >
      <CardActionArea>
        <CardMedia
          style={{objectFit: 'contain'}}
          className='poster-image'
          component="img"
          height="300"
          image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
        />
      </CardActionArea>
    </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            <b>{movie.title}</b>
          </Typography>
          <img src={`https://image.tmdb.org/t/p/w400/${movie.poster_path}`} alt={movie.title} />
          <h3>Rating: {movie.vote_average}</h3>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <b>Overview: </b>
            <i>{movie.overview}</i>
          </Typography>
        </Box>
      </Modal>
    </div>
  );  
}

export default CardAndModal
