import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { NFTContext } from "../context/NFTContext";
import { NFTCard, Loader, NftCard, Button } from "../components";
import { shortenAddress } from "../utils/shortenAddress";
import { useRouter } from "next/router";
import Nft1 from "../assets/nft1.png";
import Nft2 from "../assets/nft2.jpeg";
import Nft3 from "../assets/nft3.jpeg";
import Nft4 from "../assets/nft4.jpeg";
import Nft5 from "../assets/nft5.jpeg";
import Nft6 from "../assets/nft6.jpeg";
import Nft7 from "../assets/nft7.webp";
import Nft8 from "../assets/nft8.jpeg";
import Nft9 from "../assets/nft9.png";
import Profile from "../assets/profile-test6.jpg";
import { Modal } from "../components";

const PaymentBodyCmp = ({ nft, nftCurrency }) => {
  const imagesNft = [Nft1, Nft2, Nft3, Nft4, Nft5, Nft6, Nft7, Nft8, Nft9];

  return (
    <div className="flex flex-col">
      <div className="flexBetween">
        <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-base minlg:text-xl">
          Item
        </p>
        <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-base minlg:text-xl">
          SubTotal
        </p>
      </div>

      <div className="flexBetweenStart my-5">
        <div className="flex-1 flexStartCenter">
          <div className="relative w-28 h-28 ">
            <Image src={imagesNft[0]} layout="fill" objectFit="cover" />
          </div>
          <div className="flexCenterStart flex-col ml-5">
            <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm minlg:text-xl">
              {shortenAddress(nft.seller)}
            </p>
            <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm minlg:text-xl">
              {nft.name}
            </p>
          </div>
          <div></div>
        </div>
        <p className="font-poppins dark:text-white text-nft-black-1 font-normal text-sm minlg:text-xl">
          {nft.price} <span className="font-semibold">{nftCurrency}</span>
        </p>
      </div>
      <div className="flexBetween mt-10">
        <p className="font-poppins dark:text-white text-nft-black-1 font-normal text-base minlg:text-xl">
          Total
        </p>
        <p className="font-poppins dark:text-white text-nft-black-1 font-normal text-sm minlg:text-xl">
          {nft.price} <span className="font-semibold">{nftCurrency}</span>
        </p>
      </div>
    </div>
  );
};

const NftDetails = () => {
  const { currentAccount, nftCurrency, buyNFT } = useContext(NFTContext);
  const [isLoading, setIsLoading] = useState(true);
  const [nft, setNft] = useState({
    image: "",
    tokenId: "",
    name: "",
    owner: "",
    price: "",
    seller: "",
  });
  const router = useRouter();
  const imagesNft = [Nft1, Nft2, Nft3, Nft4, Nft5, Nft6, Nft7, Nft8, Nft9];
  const [paymentModal, setPaymentModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;
    setNft(router.query);
    setIsLoading(false);
  }, [router.isReady]);

  const checkOut = async () => {
    await buyNFT(nft);

    setPaymentModal(false);
    setSuccessModal(true);
  };

  if (isLoading) return <Loader />;

  return (
    <div className="relative flex justify-center md:flex-col min-h-screen">
      <div
        className="relative flex-1 
            flexCenter sm:px-4 p-12 border-r 
            md:border-r-0 md:border-b 
            dark:border-nft-black-1 border-nft-gray-1"
      >
        <div className="relative w-557 minmd:w-2/3 minmd:h-2/3 sm:w-full sm:h-300 h-557">
          <Image
            src={imagesNft[0]}
            objectFit="cover"
            className="rounded-xl shadow-lg"
            layout="fill"
          />
        </div>
      </div>

      <div className="flex-1 justify-start sm:px-4 p-12 sm:pb-4 ">
        <div className="flex flex-row sm:flex-col ">
          <h2 className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl minlg:text-3xl">
            {nft.name}
          </h2>
        </div>
        <div className="mt-10">
          <p className="font-poppins dark:text-white text-nft-black-1 text-xs minlg:text-base font-normal">
            Creator
          </p>
          <div className="flex flex-row items-center mt-3">
            <div className="relative w-15 h-15 minlg:w-20 minlg:h-20 mr-2">
              <Image
                src={Profile}
                objectFit="cover"
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
            <p className="font-poppins dark:text-white text-nft-black-1 text-xs minlg:text-base font-semibold">
              {shortenAddress(nft.seller)}
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col">
          <div className="w-full border-b dark:border-nft-black-1 border-nft-gray-1 flex flex-row">
            <p className="font-poppins dark:text-white text-nft-black-1 text-base minlg:text-base font-medium mb-2">
              Details
            </p>
          </div>
          <div className="mt-3">
            <p className="font-poppins dark:text-white text-nft-black-1 text-base font-normal">
              {nft.description}
            </p>
          </div>
        </div>
        <div className="flex flex-row sm:flex-col mt-10">
          {currentAccount === nft.seller.toLowerCase() ? (
            <p className="font-poppins dark:text-white text-nft-black-1 text-base font-normal border border-gray p-2">
              You Cannot Buy your own NFT
            </p>
          ) : (
            <Button
              btnName={`Buy for ${nft.price} ${nftCurrency}`}
              classStyles="mr-5 sm:mr-0 rounded-xl"
              handleClick={() => setPaymentModal(true)}
            />
          )}
        </div>
      </div>
      {paymentModal && (
        <Modal
          header="Check Out"
          body={<PaymentBodyCmp nft={nft} nftCurrency={nftCurrency} />}
          footer={
            <div className="flex flex-row sm:flex-col ">
              <Button
                btnName="Checkout"
                classStyles="mr-5 sm:mb-5 sm:mr-0 rounded-xl"
                handleClick={checkOut}
              />
              <Button
                btnName="Cancel"
                classStyles="rounded-xl"
                handleClick={() => setPaymentModal(false)}
              />
            </div>
          }
          handleClose={() => setPaymentModal(false)}
        />
      )}

      {successModal && (
        <Modal
          header="Payment Successful"
          body={
            <div
              className="flexCenter flex-col text-center"
              onClick={() => setSuccessModal(false)}
            >
              <div className="relative w-52 h-52">
                <Image src={imagesNft[0]} objectFit="cover" layout="fill" />
              </div>
              <p className="font-poppins dark:text-white text-nft-black-1 font-normal text-sm minlg:text-xl mt-10">
                You successfully purchased{" "}
                <span className="font-semibold">{nft.name} </span> from{" "}
                <span className="font-semibold">
                  {shortenAddress(nft.seller)}
                </span>
              </p>
            </div>
          }
          footer={
            <div className="flexCenter flex-col ">
              <Button
                btnName="Check It Out"
                classStyles="sm:mb-5 sm:mr-0 rounded-xl"
                handleClick={() => router.push("/my-nfts")}
              />
            </div>
          }
          handleClose={() => setPaymentModal(false)}
        />
      )}
    </div>
  );
};

export default NftDetails;
