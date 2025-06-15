import React, { useState } from 'react';
import './_header.scss';
import { AiOutlineSearch, AiOutlineAudio } from 'react-icons/ai';
import { MdNotifications, MdApps } from 'react-icons/md';
import { FaBars } from 'react-icons/fa';
import FilterListIcon from '@mui/icons-material/FilterList';
import {
  Dialog, DialogTitle, DialogContent,
  FormGroup, FormControlLabel, Checkbox, Button
} from '@mui/material';

const Header = ({ filters, setFilters }) => {
  const [open, setOpen] = useState(false);

  const handleFilterOpen = () => setOpen(true);
  const handleFilterClose = () => setOpen(false);

  const handleChange = (event) => {
    setFilters(prev => ({
      ...prev,
      [event.target.name]: event.target.checked
    }));
  };

  const handleApplyFilter = () => handleFilterClose();

  return (
    <>
      <div className="header">
        <div className="header__left">
          <FaBars className="header__menu" size={24} />
          <div className="onac-logo">ONAC</div>
        </div>

        <form className="header__searchForm">
          <input type="text" placeholder="Search" />
          <button type="submit">
            <AiOutlineSearch size={20} />
          </button>
          <AiOutlineAudio className="header__mic" size={20} />
        </form>

        <div className="header__icons">
          <MdApps size={24} />
          <MdNotifications size={24} />
          <FilterListIcon style={{ cursor: 'pointer' }} onClick={handleFilterOpen} />
        </div>
      </div>

      <Dialog open={open} onClose={handleFilterClose}
        PaperProps={{
          style: {
            backgroundColor: '#121212',
            color: '#0ef',
            padding: '1rem',
            borderRadius: '10px',
          },
        }}>
        <DialogTitle style={{ color: '#0ef' }}>Filter By</DialogTitle>
        <DialogContent>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox name="posts" checked={filters.posts} onChange={handleChange} sx={{ color: '#0ef' }} />}
              label="Posts"
            />
            <FormControlLabel
              control={<Checkbox name="textStory" checked={filters.textStory} onChange={handleChange} sx={{ color: '#0ef' }} />}
              label="Text Stories"
            />
            <FormControlLabel
              control={<Checkbox name="polls" checked={filters.polls} onChange={handleChange} sx={{ color: '#0ef' }} />}
              label="Polls"
            />
            <FormControlLabel
              control={<Checkbox name="users" checked={filters.users} onChange={handleChange} sx={{ color: '#0ef' }} />}
              label="Users"
            />
          </FormGroup>
          <Button onClick={handleApplyFilter}
            sx={{
              mt: 2, backgroundColor: '#0ef', color: '#081b29',
              '&:hover': { backgroundColor: '#00bcd4' }
            }}>Apply Filter</Button>
          <Button onClick={handleFilterClose}
            sx={{
              mt: 2, ml: 2, backgroundColor: '#0ef', color: '#081b29',
              '&:hover': { backgroundColor: '#00bcd4' }
            }}>Close</Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Header;
