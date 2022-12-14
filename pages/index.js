import { useState, useEffect, useRef, useContext } from "react";
import { Banner, CreatorCard, NftCard, SearchBar } from "../components/";
import Profile1 from "../assets/profile-test1.jpeg";
import Profile2 from "../assets/profile-test2.jpeg";
import Profile3 from "../assets/profile-test3.jpeg";
import Profile4 from "../assets/profile-test4.jpeg";
import Profile5 from "../assets/profile-test5.jpeg";
import Profile6 from "../assets/profile-test6.jpg"
import Nft1 from "../assets/nft1.png";
import Nft2 from "../assets/nft2.jpeg";
import Nft3 from "../assets/nft3.jpeg";
import Nft4 from "../assets/nft4.jpeg";
import Nft5 from "../assets/nft5.jpeg";
import Nft6 from "../assets/nft6.jpeg";
import Nft7 from "../assets/nft7.webp";
import Nft8 from "../assets/nft8.jpeg";
import Nft9 from "../assets/nft9.png"
import ArrowLeft from "../assets/arrow-left.png";
import ArrowRight from "../assets/arrow-right.png";
import { makeId } from "../utils/makeId";
import Image from "next/image";
import { useTheme } from "next-themes";
import { NFTContext } from "../context/NFTContext";

const Home = () => {
  const [hideButtons, setHideButtons] = useState(false);
  const { theme } = useTheme();
  const [ nfts, setNfts ] = useState([]);
  const [ nftsCopy, setNftsCopy ] = useState([]);
  const parentRef = useRef(null);
  const scrollRef = useRef(null);
  const { fetchNFTs } = useContext(NFTContext);
  const [ activeSelect, setActiveSelect ] = useState('Recently added');

  useEffect(() => {
    fetchNFTs()
      .then((items) => {
        setNfts(items);
        setNftsCopy(items);
      })
  }, [])

  const images = [Profile1, Profile2, Profile3, Profile4, Profile5, Profile6];
  const imagesNft = [Nft1, Nft2, Nft3, Nft4, Nft5, Nft6, Nft7, Nft8, Nft9];

  const handleScroll = (direction) => {
    const { current } = scrollRef;

    const scrollAmount = window.innerWidth > 1800 ? 270 : 210;

    if (direction === "left") {
      current.scrollLeft -= scrollAmount;
    } else {
      current.scrollLeft += scrollAmount;
    }
  };

  const isScrollable = () => {
    const { current } = scrollRef;
    const { current: parent } = parentRef;

    if (current?.scrollWidth >= parent?.offsetWidth) {
      setHideButtons(false);
    } else {
      setHideButtons(true);
    }
  };

  useEffect(() => {
    isScrollable();
    window.addEventListener("resize", isScrollable);

    return () => {
      window.removeEventListener("resize", isScrollable);
    };
  });

  const onHandleSearch = (value) => {
    const filteredNfts = nfts.filter(({ name }) =>
      name.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredNfts.length) {
      setNfts(filteredNfts);
    } else {
      setNfts(filteredNfts);
    }
  };

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-full minmd:w-4/5">
        <Banner
          parentStyles="justify-center mb-6 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl"
          childStyles="md:text-4xl sm:text-2xl xs:text-xl text-left"
          name="Discover, Collect and Sell extraordinary NFTs"
        />

        <div>
          <h1
            className="font-poppins 
          dark:text-white text-nft-black-1 
          text-2xl minlg:text-4xl font-semibold 
          ml-4 xs:ml-0"
          >
            Best Creators
          </h1>

          <div className="relative flex-1 max-w-full flex mt-3" ref={parentRef}>
            <div
              className="flex flex-row w-max overflow-x-scroll no-scrollbar select-none"
              ref={scrollRef}
            >
              {[1, 2, 3, 4, 5].map((i) => (
                <CreatorCard
                  key={`creator-${i}`}
                  rank={i}
                  creatorImage={images[i]}
                  creatorName={`0x${makeId(3)}...${makeId(4)}`}
                  creatorEths={10 - i * 0.5}
                />
              ))}
              {!hideButtons && (
                <>
                  <div
                    onClick={() => handleScroll("left")}
                    className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer left-0"
                  >
                    <Image
                      src={ArrowLeft}
                      layout="fill"
                      objectFit="contain"
                      alt="left-arrow"
                      className={theme === "light" && "filter invert"}
                    />
                  </div>
                  <div
                    onClick={() => handleScroll("right")}
                    className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer right-0"
                  >
                    <Image
                      src={ArrowRight}
                      layout="fill"
                      objectFit="contain"
                      alt="right-arrow"
                      className={theme === "light" && "filter invert"}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10">
          <div className="flexBetween mx-4 xs:mx-0 minlg:mx-8 sm:flex-col sm:items-start">
            <h1
              className="flex-1 before:first:font-poppins 
              dark:text-white text-nft-black-1 
              text-2xl minlg:text-4xl font-semibold sm:mb-4"
            >
              Hot Bids
            </h1>
            <div className="flex-2 sm:w-full flex flex-row sm:flex-col">
            <SearchBar
              activeSelect={activeSelect}
              setActiveSelect={setActiveSelect}
              handleSearch={onHandleSearch}
            //   clearSearch={onClearSearch}
            />
            </div>
          </div>
          <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center">
                {
                  nfts.map((nft) => <NFTCard key={nft.tokenId} nft={nft} />)
                }
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <NftCard
                    key={`nft-${i}`}
                    nft={{
                      i,
                      image: imagesNft[i],
                      name: `Nifty NFT ${i}`,
                      price: (10 - i * 0.5),
                      seller: `0x${makeId(3)}...${makeId(4)}`,
                      owner: `0x${makeId(3)}...${makeId(4)}`,
                      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages"
                    }}
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
