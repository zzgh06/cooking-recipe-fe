import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
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
  TextField,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Person as PersonIcon,
  Restaurant as RestaurantIcon,
  ShoppingCart as ShoppingCartIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userSlice";
import { useLoginWithToken } from "../../hooks/User/useLoginWithToken";
import { RootState } from "../../redux/store";

const StyledAppBar = styled(AppBar)({
  backgroundColor: "#ffffff",
  boxShadow: "0px 1px 1px 1px rgb(221, 221, 221)",
  padding: "0 15px",
});

const Logo = styled(Typography)({
  cursor: "pointer",
  fontSize: "23px",
  fontWeight: 600,
  color: "black",
  minWidth: "195px",
});

const NavMenu = styled(Box)({
  display: "flex",
  alignItems: "center",
  marginLeft: "auto",
  "& a": {
    textDecoration: "none",
    color: "black",
    fontWeight: 600,
    fontSize: "18px",
    margin: "0 10px",
  },
});

const SearchContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  flexGrow: 1,
  justifyContent: "center",
  padding: "0 20px",
});

const StyledTextField = styled(TextField)({
  borderRadius: "20px",
  backgroundColor: "#f3f3f3",
  width: "100%",
  maxWidth: "450px",
  "& .MuiInputBase-input": {
    padding: "10px",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "20px",
  },
});

const SidebarList = styled(List)({
  width: 350,
});

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { mutate: fetchUser } = useLoginWithToken();
  const { user } = useSelector((state: RootState) => state.auth);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      if (keyword.trim() === "") {
        navigate("/");
      } else {
        navigate(`/search?name=${keyword}`);
      }
    }
  };

  const handleSearchClick = () => {
  };

  const menuItems = ["레시피", "스토어", "My 냉장고"];
  const menuPathMapping: { [key: string]: string } = {
    레시피: "recipes/all",
    스토어: "store",
    "My 냉장고": "fridge",
  };

  return (
    <StyledAppBar position="fixed">
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "auto",
          maxHeight: "95px",
          paddingBottom: "11px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          {user && user?.level === "admin" && (
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

          <IconButton
            size="large"
            aria-label="account"
            onClick={handleMenuClick}
            sx={{ padding: "7px 10px" }}
          >
            <PersonIcon />
          </IconButton>
          <IconButton
            size="large"
            aria-label="recipes"
            onClick={() => navigate("/account/recipe")}
            sx={{ padding: "7px 10px" }}
          >
            <RestaurantIcon />
          </IconButton>
          <IconButton
            size="large"
            aria-label="cart"
            onClick={() => navigate("/cart")}
            sx={{ padding: "7px 10px" }}
          >
            <ShoppingCartIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Logo onClick={() => navigate("/")}>냉장고에 뭐 있지?</Logo>
          {!isMobile && (
            <SearchContainer>
              <StyledTextField
                variant="outlined"
                placeholder="검색어를 입력하세요"
                value={keyword}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setKeyword(e.target.value)
                }
                onKeyPress={handleSearch}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={handleSearchClick}>
                      <SearchIcon />
                    </IconButton>
                  ),
                }}
              />
            </SearchContainer>
          )}
          {!isMobile ? (
            <NavMenu>
              {menuItems.map((item) => (
                <Link to={`/${menuPathMapping[item]}`} key={item}>
                  {item}
                </Link>
              ))}
            </NavMenu>
          ) : (
            <IconButton
              size="large"
              edge="end"
              aria-label="menu"
              onClick={toggleSidebar}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Box>
        <Drawer
          anchor="right"
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        >
          <Box
            sx={{ width: 300 }}
            role="presentation"
            onClick={(e) => e.stopPropagation()}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                p: 2,
              }}
            >
              <Typography variant="h6">Menu</Typography>
              <IconButton onClick={toggleSidebar}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Box sx={{ padding: "0 16px 16px 16px" }} onClick={handleSearchClick}>
              <StyledTextField
                variant="outlined"
                placeholder="검색어를 입력하세요"
                value={keyword}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setKeyword(e.target.value)
                }
                onKeyPress={handleSearch}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={handleSearchClick}>
                      <SearchIcon />
                    </IconButton>
                  ),
                }}
              />
            </Box>
            <Divider />
            <SidebarList>
              {menuItems.map((item) => (
                <ListItem
                  button
                  component={Link}
                  to={`/${menuPathMapping[item]}`}
                  key={item}
                >
                  <ListItemText primary={item} />
                </ListItem>
              ))}
              <Divider />
            </SidebarList>
          </Box>
        </Drawer>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          {user?.name
            ? [
              <MenuItem
                key="profile"
                onClick={() => navigate("/account/profile")}
              >
                {user?.name}님
              </MenuItem>,
              <MenuItem key="logout" onClick={handleLogout}>
                로그아웃
              </MenuItem>,
            ]
            : [
              <MenuItem key="register" onClick={() => navigate("/register")}>
                회원가입
              </MenuItem>,
              <MenuItem key="login" onClick={() => navigate("/login")}>
                로그인
              </MenuItem>,
            ]}
        </Menu>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;
