import DashboardBox from "@/components/DashboardBox";
import { Avatar, Grid, Typography, IconButton, Paper } from "@mui/material";
import { Facebook, Twitter, LinkedIn, Instagram } from "@mui/icons-material";
import { styled } from "@mui/system";

const teamMembers = [
  {
    name: "Navaneetha Krishnaa",
    registerNo: "43111244",
    department: "B.E CSE",
    yearOfStudy: "2nd Year",
    role: "Team Leader",
    avatar: "/path/to/avatar1.png",
    socialLinks: {
      facebook: "https://facebook.com/johndoe",
      twitter: "https://twitter.com/johndoe",
      linkedin: "https://linkedin.com/in/johndoe",
      instagram: "https://instagram.com/johndoe",
    },
  },
  {
    name: "Akshay Esackimuthu",
    registerNo: "43110044",
    department: "B.E CSE",
    yearOfStudy: "2nd Year",
    role: "User Interface Designer",
    avatar: "/path/to/avatar2.png",
    socialLinks: {
      facebook: "https://facebook.com/janesmith",
      twitter: "https://twitter.com/janesmith",
      linkedin: "https://linkedin.com/in/janesmith",
      instagram: "https://instagram.com/janesmith",
    },
  },
  {
    name: "Nikitha Baskaran",
    registerNo: "42110894",
    department: "B.E CSE",
    yearOfStudy: "3rd Year",
    role: "Lead Presenter",
    avatar: "/path/to/avatar3.png",
    socialLinks: {
      facebook: "https://facebook.com/alicejohnson",
      twitter: "https://twitter.com/alicejohnson",
      linkedin: "https://linkedin.com/in/alicejohnson",
      instagram: "https://instagram.com/alicejohnson",
    },
  },
  {
    name: "Nivedha S S",
    registerNo: "42110915",
    department: "B.E CSE",
    yearOfStudy: "3rd Year",
    role: "ML Engineer",
    avatar: "/path/to/avatar4.png",
    socialLinks: {
      facebook: "https://facebook.com/bobbrown",
      twitter: "https://twitter.com/bobbrown",
      linkedin: "https://linkedin.com/in/bobbrown",
      instagram: "https://instagram.com/bobbrown",
    },
  },
  {
    name: "Alfred Mathew",
    registerNo: "43110050",
    department: "B.E CSE",
    yearOfStudy: "2nd Year",
    role: "Data Analyst",
    avatar: "/path/to/avatar5.png",
    socialLinks: {
      facebook: "https://facebook.com/charliedavis",
      twitter: "https://twitter.com/charliedavis",
      linkedin: "https://linkedin.com/in/charliedavis",
      instagram: "https://instagram.com/charliedavis",
    },
  },
  {
    name: "Syed Abrar",
    registerNo: "42110000",
    department: "B.E CSE",
    yearOfStudy: "3rd Year",
    role: "Backend Developer",
    avatar: "/path/to/avatar6.png",
    socialLinks: {
      facebook: "https://facebook.com/dianagreen",
      twitter: "https://twitter.com/dianagreen",
      linkedin: "https://linkedin.com/in/dianagreen",
      instagram: "https://instagram.com/dianagreen",
    },
  },
];

// Styles for the "Team Luminaries" heading
const StyledDashboardBoxHeading = styled(DashboardBox)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(3),
  backgroundColor: '#3f3f46', 
  color: '#ffffff',
  borderRadius: theme.spacing(1),
  marginBottom: theme.spacing(2), 
  marginTop: theme.spacing(4), 

}));

// Styles for the team member cards
const StyledDashboardBox = styled(DashboardBox)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr', 
  gap: theme.spacing(3),
  padding: theme.spacing(3),
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: '1fr 1fr', 
  },
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: '1fr 1fr 1fr', 
  },
}));

export const AboutUs = () => {
  return (
    <>

      <StyledDashboardBoxHeading>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              Team Luminaries
        </Typography>
      </StyledDashboardBoxHeading>

      <StyledDashboardBox>
        {teamMembers.map((member, index) => (
          <Paper
            key={index}
            elevation={3}
            sx={{
              padding: 3,
              borderRadius: 2,
              textAlign: 'center',
              transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
              backgroundColor: '#3f3f46', 
              color: '#ffffff', 
              '&:hover': {
                transform: 'translateY(-10px)',
                boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.15)',
              },
            }}
          >
            <Avatar
              alt={member.name}
              src={member.avatar}
              sx={{ width: 100, height: 100, marginBottom: 2, mx: 'auto' }}
            />
            <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.25rem', color: '#FFFFFF' }} gutterBottom>
              {member.name}
            </Typography>
            <Typography variant="body2" color="#A3A3A3">Role: {member.role}</Typography>
            <Typography variant="body2" color="#A3A3A3">Reg No: {member.registerNo}</Typography>
            <Typography variant="body2" color="#A3A3A3">Department: {member.department}</Typography>
            <Typography variant="body2" color="#A3A3A3">Year of Study: {member.yearOfStudy}</Typography>
            <Grid container justifyContent="center" spacing={1} sx={{ marginTop: 2 }}>
              <Grid item>
                <IconButton href={member.socialLinks.facebook} aria-label="Facebook" sx={{ color: '#4267B2' }}>
                  <Facebook />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton href={member.socialLinks.twitter} aria-label="Twitter" sx={{ color: '#1DA1F2' }}>
                  <Twitter />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton href={member.socialLinks.linkedin} aria-label="LinkedIn" sx={{ color: '#0077B5' }}>
                  <LinkedIn />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton href={member.socialLinks.instagram} aria-label="Instagram" sx={{ color: '#E4405F' }}>
                  <Instagram />
                </IconButton>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </StyledDashboardBox>
    </>
  );
};