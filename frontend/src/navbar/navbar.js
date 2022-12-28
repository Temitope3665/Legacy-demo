import { Box, Button, Flex, Image, MenuDivider, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../src/assets/icons/logo.svg";
import { close, hamburger } from "../assets/svgs/svg";
import CustomButton from "../common/CustomButton";
import { ChevronDownIcon, toaster } from "evergreen-ui";
import { useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import getUserInterval, {
  connect as connectWallet,
  checkConnection,
  disconnect as disconnectWallet,
  isDisconnected,
  hasLegacy,
  uauth,
  loginWithUnstoppable,
  logoutAcct
} from "../utils/helpers"
import UnstoppableLogo from '../assets/icons/unstoppable-logo.png';
import MetamaskLogo from '../assets/icons/metamask-icon.png';

const Navbar = () => {
  const navigate = useNavigate();
  const [openNavBar, setOpenNavBar] = useState(false);
  const [user, setUser] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const walletAddr = localStorage.getItem("wallet_addr");

  const disconnect = () => {
    disconnectWallet();
    setIsConnected(false);
    navigate('/');
  }

  const goToProfile = async () => {
    if (!isDisconnected()) {
      if (await hasLegacy(checkConnection())) {
        navigate('/profile');
      }
    } else {
      toaster.warning("Connect your wallet first")
    }
  }

  const connect = async () => {
    try {
      const account = await connectWallet()
      if (account) {
        setUser(account);
        setIsConnected(true);
      }
    } catch (err) {
      setIsConnected(false);
      console.log(err)
    }
  }

  useEffect(() => {
    try {
      if (!isDisconnected()) {
        const account = checkConnection();
        if (account) {
          setIsConnected(true)
          setUser(account);
        }
        else {
          disconnect();
          navigate('/');
        }
      } else {
        navigate('/')
      }
    } catch (err) {
      console.log(err)
    }
  }, []);

  return (
    <>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        display={{ base: "block", lg: "flex" }}
      >
        <Flex
          alignItems="center"
          justifyContent="space-around"
          display={{ base: "none", lg: "flex" }}
        >
          <Flex alignItems="center" justifyContent="space-between">
            <Link to="/">
              <Image w={{ base: "40px", lg: "60px" }} src={logo} alt="logo" />
            </Link>
            <Box
              onClick={() => setOpenNavBar(!openNavBar)}
              display={{ base: "block", lg: "none" }}
            >
              {openNavBar ? close : hamburger}
            </Box>
          </Flex>
          <Text
            cursor="pointer"
            ml={{ base: "0", lg: "100px" }}
            mt={{ base: "20px", lg: "0" }}
            _hover={{ color: "brand.teal" }}
            color="brand.white"
            onClick={() => { goToProfile() }}
          >
            Profile
          </Text>
            <a href="/#about-us">
            <Text
              cursor="pointer"
              ml={{ base: "0", lg: "100px" }}
              mt={{ base: "20px", lg: "0" }}
              _hover={{ color: "brand.teal" }}
              color="brand.white"
            >
              About us
            </Text>
            </a>
          <a href="/#how-it-works">
            <Text
              cursor="pointer"
              mt={{ base: "20px", lg: "0" }}
              ml={{ base: "0", lg: "100px" }}
              _hover={{ color: "brand.teal" }}
              color="brand.white"
            >
              How it works
            </Text>
          </a>
        </Flex>

        {window.screen.width > 750 &&
          <Menu>
                      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                        <Text fontWeight="medium" fontSize="14px">
                          {!isConnected ? 'Connect' : 'Disconnect'}
                        </Text>
                      </MenuButton>
                      <MenuList>
                          <>
                            <MenuItem onClick={isConnected ? disconnect : connect}>
                              <Flex>
                              <Image cursor="pointer" src={MetamaskLogo} alit="unstoppable-logo" w="20px" />
                                <Text ml="10px">{isConnected ? 'Disconnect Metamask' : 'Connect Metamask'}</Text>
                              </Flex>
                            </MenuItem>
                            <MenuDivider />
                            <MenuItem onClick={walletAddr ? logoutAcct : loginWithUnstoppable}>
                            <Flex>
                              <Image cursor="pointer" src={UnstoppableLogo} alit="unstoppable-logo" w="20px" />
                                <Text ml="10px">{walletAddr ? 'Logout With Unstoppable' : 'Login with Unstoppable'}</Text>
                              </Flex>
                            </MenuItem>
                          </>
                      </MenuList>
          </Menu>
        }

      </Flex>

      <Flex
        alignItems="center"
        justifyContent="space-between"
        mt="20px"
        display={{ base: "flex", lg: "none" }}
      >
        <Link to="/">
          <Image w={{ base: "40px", lg: "60px" }} src={logo} alt="logo" />
        </Link>
        <Box
          onClick={() => setOpenNavBar(!openNavBar)}
          display={{ base: "block", lg: "none" }}
        >
          {openNavBar ? close : hamburger}
        </Box>
      </Flex>

      {openNavBar && (
        <Flex
          justifyContent="space-between"
          alignItems="center"
          display={{ base: "block", lg: "flex" }}
          height={{ base: "100vh", lg: "" }}
        >
          <Flex
            alignItems="center"
            justifyContent="space-around"
            display={{ base: "block", lg: "flex" }}
            w="100%"
          >
            <Text
              cursor="pointer"
              textAlign="center"
              ml={{ base: "0", lg: "100px" }}
              mt={{ base: "20px", lg: "0" }}
              _hover={{ color: "brand.teal" }}
              color="brand.white"
              onClick={() => { goToProfile() }}
            >
              Profile
            </Text>
            <Text
              cursor="pointer"
              textAlign="center"
              ml={{ base: "0", lg: "100px" }}
              mt={{ base: "20px", lg: "0" }}
              _hover={{ color: "brand.teal" }}
              color="brand.white"
            >
              About us
            </Text>
            <Text
              cursor="pointer"
              textAlign="center"
              mt={{ base: "20px", lg: "0" }}
              ml={{ base: "0", lg: "100px" }}
              _hover={{ color: "brand.teal" }}
              color="brand.white"
            >
              How it works
            </Text>
          </Flex>

<Flex mt="20px" justifyContent="center">
          <Menu>
                  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    <Text fontWeight="medium" fontSize="14px">
                    {!isConnected ? 'Connect' : 'Disconnect'}
                    </Text>
                  </MenuButton>
                  <MenuList>
                      <>
                        <MenuItem onClick={isConnected ? disconnect : connect}>
                          <Flex>
                          <Image cursor="pointer" src={MetamaskLogo} alit="unstoppable-logo" w="20px" />
                            <Text ml="10px">{isConnected ? 'Disconnect Metamask' : 'Connect Metamask'}</Text>
                          </Flex>
                        </MenuItem>
                        <MenuDivider />
                        <MenuItem onClick={walletAddr ? logoutAcct : loginWithUnstoppable}>
                        <Flex>
                          <Image cursor="pointer" src={UnstoppableLogo} alit="unstoppable-logo" w="20px" />
                            <Text ml="10px">{walletAddr ? 'Logout With Unstoppable' : 'Login with Unstoppable'}</Text>
                          </Flex>
                        </MenuItem>
                      </>
                  </MenuList>
      </Menu>
</Flex>
        </Flex>
      )}
    </>
  );
};

export default Navbar;
