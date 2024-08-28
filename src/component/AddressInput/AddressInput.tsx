import React, { useState } from "react";
import { Box, Button, Typography, Paper } from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";
import DaumPostcodeEmbed, { Address } from "react-daum-postcode";

interface AddressInputProps {
  setAddress: (address: string) => void;
}

const AddressInput = ({ setAddress }: AddressInputProps) => {
  const [isPostcodeOpen, setIsPostcodeOpen] = useState<boolean>(false);

  const togglePostcode = () => {
    setIsPostcodeOpen(!isPostcodeOpen);
  };

  const handleAddressSelect = (data: Address) => {
    const fullAddress = data.address;
    const extraAddress =
      data.addressType === "R"
        ? (data.bname !== "" ? ` (${data.bname})` : "") +
          (data.buildingName !== "" ? `, ${data.buildingName}` : "")
        : "";
    setAddress(fullAddress + extraAddress);
    setIsPostcodeOpen(false);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          mb: 1
        }}
      >
        <Button
          onClick={togglePostcode}
          variant="outlined"
          color="primary"
          endIcon={<ArrowDropDown />}
          sx={{
            width: '100px',
            textTransform: 'none',
            fontSize: 'small',
            padding: '4px',
            borderColor: 'black',
            color: 'black',
            '&:hover': {
              borderColor: 'black',
              backgroundColor: 'lightgreen',
            },
          }}
        >
          지역 선택
        </Button>
        <Typography variant="body2" color="textSecondary">
          서울과 경기도는 새벽배송 가능 지역입니다.
        </Typography>
      </Box>
      {isPostcodeOpen && (
        <Paper
          sx={{
            position: 'absolute',
            zIndex: 100,
            width: "100%",
            height: '400px',
            boxShadow: 3,
            top: '100%',
            left: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            backgroundColor: 'white'
          }}
        >
          <DaumPostcodeEmbed onComplete={handleAddressSelect} />
        </Paper>
      )}
    </Box>
  );
};

export default AddressInput;