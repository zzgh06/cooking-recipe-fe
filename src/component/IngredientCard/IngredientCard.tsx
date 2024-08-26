// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   CardMedia,
//   CardMediaProps,
//   FormControl,
//   Grid,
//   InputLabel,
//   MenuItem,
//   Modal,
//   Select,
//   SelectChangeEvent,
//   Typography,
//   styled,
// } from "@mui/material";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
// import { useSelector } from "react-redux";
// import { useAddToCart } from "../../hooks/Cart/useAddToCart";
// import { currencyFormat } from "../../utils/number";
// import { RootState } from "../../redux/store";

// const StyledCard = styled(Card)(({ theme }) => ({
//   position: "relative",
//   marginBottom: "10px",
//   width: "100%",
//   padding: "10px 20px",
//   transition: "all 0.5s",
//   boxShadow: "none",
//   [theme.breakpoints.down('sm')]: {
//     padding: "5px 10px",
//   },
// }));

// const StyledCardMedia = styled(CardMedia)<CardMediaProps>(({ theme }) => ({
//   width: "100%",
//   height: "315px",
//   marginBottom: "15px",
//   borderRadius: "8px",
//   boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//   transition: "all 0.3s",
//   "&:hover": {
//     transform: "scale(1.01)",
//   },
//   [theme.breakpoints.down('sm')]: {
//     height: "200px",
//   },
// }));

// const Title = styled(Typography)(({ theme }) => ({
//   fontSize: "17px",
//   fontWeight: 600,
//   [theme.breakpoints.down('sm')]: {
//     fontSize: "15px",
//   },
// }));

// const Price = styled(Typography)(({ theme }) => ({
//   marginTop: "8px",
//   fontSize: "19px",
//   fontWeight: 600,
//   color: "black",
//   [theme.breakpoints.down('sm')]: {
//     fontSize: "16px",
//   },
// }));

// const OriginPrice = styled(Typography)(({ theme }) => ({
//   fontSize: "15px",
//   color: "rgb(164, 164, 164)",
//   textDecoration: "line-through",
//   [theme.breakpoints.down('sm')]: {
//     fontSize: "13px",
//   },
// }));

// const DiscountRate = styled(Typography)(({ theme }) => ({
//   fontSize: "19px",
//   fontWeight: 600,
//   color: "orangered",
//   [theme.breakpoints.down('sm')]: {
//     fontSize: "16px",
//   },
// }));

// const DiscountPrice = styled(Typography)(({ theme }) => ({
//   fontSize: "19px",
//   fontWeight: 600,
//   color: "black",
//   marginLeft: "10px",
//   [theme.breakpoints.down('sm')]: {
//     fontSize: "16px",
//     marginLeft: "5px",
//   },
// }));

// interface IngredientCardProps {
//   item: {
//     _id: string;
//     name: string;
//     images: string[];
//     price: number;
//     discountPrice?: number;
//   };
// }

// const IngredientCard = ({ item }: IngredientCardProps) => {
//   const navigate = useNavigate();
//   const [open, setOpen] = useState<boolean>(false);
//   const [qty, setQty] = useState<number>(1);
//   // const { mutate: addToCart, isLoading } = useAddToCart();
//   const { user } = useSelector((state: RootState) => state.auth);

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const showIngredient = (id: string) => {
//     navigate(`/ingredients/${id}`);
//   };

//   const calculateDiscountedPrice = (price: number, discountRate: number = 0): number => {
//     const discountedPrice = price * (1 - discountRate / 100);
//     return Math.floor(discountedPrice);
//   };

//   const handleQtyChange = (event: SelectChangeEvent<number>) => {
//     setQty(event.target.value as number);
//   };

//   const addCart = () => {
//     if (!user) {
//       navigate("/login");
//       return;
//     }

//     addToCart({ ingredientId: item._id, qty });
//     handleClose();
//   };

//   const optimizeImageUrl = (url: string): string => {
//     return url.replace(/\/upload\//, '/upload/c_fill,h_538,w_538,f_auto,q_auto,f_webp/');
//   };

//   return (
//     <>
//       <StyledCard>
//         <StyledCardMedia
//           component="img"
//           image={optimizeImageUrl(item.images[0])}
//           alt={item.name}
//           onClick={() => showIngredient(item?._id)}
//         />
//         <Button
//           variant="outlined"
//           sx={{ width: "100%", padding: "5px 0" }}
//           onClick={handleOpen}
//         >
//           <FontAwesomeIcon icon={faShoppingCart} />
//           <Typography variant="body2" sx={{ marginLeft: "10px" }}>
//             담기
//           </Typography>
//         </Button>
//         <CardContent>
//           <Title>{item?.name}</Title>
//           <Box>
//             {item?.discountPrice ? (
//               <>
//                 <OriginPrice>{item?.price}원</OriginPrice>
//                 <Box display="flex" alignItems="center">
//                   <DiscountRate>{item?.discountPrice}%</DiscountRate>
//                   <DiscountPrice>
//                     {currencyFormat(calculateDiscountedPrice(item?.price, item?.discountPrice))}
//                     원
//                   </DiscountPrice>
//                 </Box>
//               </>
//             ) : (
//               <Price>{currencyFormat(item?.price)}원</Price>
//             )}
//           </Box>
//         </CardContent>
//       </StyledCard>
//       <Modal open={open} onClose={handleClose}>
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: { xs: '90%', sm: 350 },
//             bgcolor: "background.paper",
//             borderRadius: "15px",
//             boxShadow: 24,
//             p: 4,
//           }}
//         >
//           <Grid container spacing={2} alignItems="center">
//             <Grid item xs={4}>
//               <img
//                 src={optimizeImageUrl(item.images[0])}
//                 alt={item.name}
//                 style={{ width: "100%" }}
//                 loading="lazy"
//               />
//             </Grid>
//             <Grid item xs={8}>
//               <Typography variant="h6" sx={{ mt: 1 }}>
//                 {item.name}
//               </Typography>
//             </Grid>
//             <Grid item xs={12}>
//               <Typography variant="body1" sx={{ mt: 1 }}>
//                 {item.name}
//               </Typography>
//             </Grid>
//             <Grid item xs={7}>
//               {item?.discountPrice ? (
//                 <Box display="flex" alignItems="center">
//                   <DiscountPrice sx={{ marginLeft: "0" }}>
//                     {calculateDiscountedPrice(item?.price, item?.discountPrice)}
//                     원
//                   </DiscountPrice>
//                   <OriginPrice sx={{ marginLeft: "10px" }}>
//                     {item?.price}원
//                   </OriginPrice>
//                 </Box>
//               ) : (
//                 <Price>{item?.price}원</Price>
//               )}
//             </Grid>
//             <Grid item xs={5}>
//               <FormControl fullWidth>
//                 <InputLabel>수량</InputLabel>
//                 <Select
//                   value={qty}
//                   label="수량"
//                   onChange={handleQtyChange}
//                 >
//                   <MenuItem value={1}>1</MenuItem>
//                   <MenuItem value={2}>2</MenuItem>
//                   <MenuItem value={3}>3</MenuItem>
//                   <MenuItem value={4}>4</MenuItem>
//                   <MenuItem value={5}>5</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid
//               item
//               xs={12}
//               sx={{ display: "flex", justifyContent: "space-between" }}
//             >
//               <Typography variant="h6">합계</Typography>
//               <Typography variant="h6">
//                 {calculateDiscountedPrice(item?.price, item?.discountPrice) * qty}원
//               </Typography>
//             </Grid>
//             <Grid item xs={6}>
//               <Button variant="outlined" color="error" onClick={handleClose} sx={{width: "100%"}}>
//                 취소
//               </Button>
//             </Grid>
//             <Grid item xs={6}>
//               <Button 
//                 variant="contained" 
//                 color="success" 
//                 onClick={addCart} 
//                 sx={{width: "100%"}}
//                 // disabled={isLoading}
//               >
//                 담기
//               </Button>
//             </Grid>
//           </Grid>
//         </Box>
//       </Modal>
//     </>
//   );
// };

// export default IngredientCard;
