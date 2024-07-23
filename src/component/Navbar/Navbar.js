import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
  styled,
  TextField
} from "@mui/material";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Person as PersonIcon,
  Restaurant as RestaurantIcon,
  ShoppingCart as ShoppingCartIcon,
  Search as SearchIcon
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userSlice";

const StyledAppBar = styled(AppBar)({
  backgroundColor: '#ffffff',
  boxShadow: '0px 1px 3px 1px rgb(221, 221, 221)',
});

const Logo = styled(Typography)({
  cursor: 'pointer',
  fontSize: '24px',
  fontWeight: 600,
  color: 'black',
});

const NavMenu = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 'auto',
  '& a': {
    textDecoration: 'none',
    color: 'black',
    fontWeight: 600,
    fontSize: '16px',
    margin: '0 15px',
  },
});

const SearchContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  flexGrow: 1,
  justifyContent: 'center',
  padding: '0 20px',
});

const StyledTextField = styled(TextField)({
  borderRadius: '20px',
  backgroundColor: '#f3f3f3',
  width: '100%',
  maxWidth: '450px',
  '& .MuiInputBase-input': {
    padding: '10px',
  },
  '& .MuiOutlinedInput-root': {
    borderRadius: '20px',
  },
});

const SidebarList = styled(List)({
  width: 250,
});

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const user = useSelector((state) => state.auth.user);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      if (keyword.trim() === "") {
        navigate("/");
      } else {
        navigate(`/search?name=${keyword}`);
      }
    }
  };

  const menuItems = ["레시피", "스토어", "My 냉장고"];
  const menuPathMapping = {
    레시피: "recipes/all",
    스토어: "store",
    "My 냉장고": "fridge",
  };

  return (
    <StyledAppBar position="fixed">
      <Toolbar  sx={{ height: "95px", display: 'flex', alignItems: 'center' }}>
        {user && user?.user.level === "admin" && (
          <Button
            variant="contained"
            color="success"
            component={Link}
            to="/admin/recipe"
            sx={{ marginRight: 2 }}
          >
            Admin page
          </Button>
        )}
        <Logo onClick={() => navigate("/")}>
          냉장고에 뭐 있지?
        </Logo>
        <SearchContainer>
          <StyledTextField
            variant="outlined"
            placeholder="검색어를 입력하세요"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyPress={handleSearch}
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
        </SearchContainer>
        <NavMenu>
          {menuItems.map((item) => (
            <Link to={`/${menuPathMapping[item]}`} key={item}>
              {item}
            </Link>
          ))}
        </NavMenu>
        <IconButton
          size="large"
          aria-label="account"
          onClick={handleMenuClick}
        >
          <PersonIcon />
        </IconButton>
        <IconButton
          size="large"
          aria-label="recipes"
          onClick={() => navigate("/account/recipe")}
        >
          <RestaurantIcon />
        </IconButton>
        <IconButton
          size="large"
          aria-label="cart"
          onClick={() => navigate("/cart")}
        >
          <ShoppingCartIcon />
        </IconButton>
        {isMobile && (
          <IconButton
            size="large"
            edge="end"
            aria-label="menu"
            onClick={toggleSidebar}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Drawer
          anchor="right"
          open={sidebarOpen}
          onClose={toggleSidebar}
        >
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleSidebar}
            onKeyDown={toggleSidebar}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
              <Typography variant="h6">Menu</Typography>
              <IconButton onClick={toggleSidebar}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Divider />
            <SidebarList>
              {menuItems.map((item) => (
                <ListItem button component={Link} to={`/${menuPathMapping[item]}`} key={item}>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
              <Divider />
              <ListItem button onClick={() => navigate("/register")}>
                <ListItemText primary="회원가입" />
              </ListItem>
              <ListItem button onClick={() => navigate("/login")}>
                <ListItemText primary="로그인" />
              </ListItem>
            </SidebarList>
          </Box>
        </Drawer>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          {user ? (
            <>
              <MenuItem onClick={() => navigate("/account/profile")}>
                {user?.user.name}님
              </MenuItem>
              <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
            </>
          ) : (
            <>
              <MenuItem onClick={() => navigate("/register")}>회원가입</MenuItem>
              <MenuItem onClick={() => navigate("/login")}>로그인</MenuItem>
            </>
          )}
        </Menu>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;
