import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  useTheme,
  useMediaQuery,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2),
  ...theme.mixins.toolbar,
}));

const SidebarListItem = styled(ListItem)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.grey[200],
  },
}));

const Sidebar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleSelectMenu = (url) => {
    navigate(url);
  };

  const menuItems = [
    { text: "Recipe", url: "/admin/recipe?page=1" },
    { text: "Ingredients", url: "/admin/ingredients?page=1" },
    { text: "Order", url: "/admin/order?page=1" },
    { text: "User", url: "/admin/user?page=1" },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      {isMobile ? (
        <Drawer
          variant="temporary"
          open
          onClose={() => {}}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              width: 240,
            },
          }}
        >
          <DrawerHeader>
            <Typography
              variant="h6"
              onClick={() => navigate("/")}
              sx={{ cursor: "pointer" }}
            >
              What’s in your fridge
            </Typography>
          </DrawerHeader>
          <Divider />
          <List>
            {menuItems.map((item) => (
              <SidebarListItem
                button
                key={item.text}
                onClick={() => handleSelectMenu(item.url)}
              >
                <ListItemText primary={item.text} />
              </SidebarListItem>
            ))}
          </List>
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            width: 240,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 240,
              boxSizing: "border-box",
              backgroundColor: "green",
              color: "#fff",
            },
          }}
        >
          <DrawerHeader>
            <Typography
              variant="h6"
              onClick={() => navigate("/")}
              sx={{ cursor: "pointer" }}
            >
              What’s in your fridge
            </Typography>
          </DrawerHeader>
          <Divider />
          <List>
            {menuItems.map((item) => (
              <SidebarListItem
                button
                key={item.text}
                onClick={() => handleSelectMenu(item.url)}
              >
                <ListItemText primary={item.text} />
              </SidebarListItem>
            ))}
          </List>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
