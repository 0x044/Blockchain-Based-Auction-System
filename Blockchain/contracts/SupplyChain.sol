// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SupplyChain {
    struct Medicine {
        uint256 id;
        string name;
        string description;
        uint256 quantity;
        uint256 basePrice;
        address owner;
        bool onAuction;
    }

    struct Auction {
        uint256 medicineId;
        uint256 highestBid;
        address highestBidder;
        bool active;
    }

    uint256 public medicineCount;
    mapping(uint256 => Medicine) public medicines;
    mapping(uint256 => Auction) public auctions;

    event MedicineAdded(uint256 id, string name, uint256 quantity, uint256 basePrice);
    event AuctionStarted(uint256 medicineId, uint256 basePrice);
    event NewBid(uint256 medicineId, address bidder, uint256 bidAmount);
    event AuctionEnded(uint256 medicineId, address winner, uint256 winningBid);

    // Add new medicine
    function addMedicine(
        string memory _name,
        string memory _description,
        uint256 _quantity,
        uint256 _basePrice
    ) public {
        medicineCount++;
        medicines[medicineCount] = Medicine(
            medicineCount,
            _name,
            _description,
            _quantity,
            _basePrice,
            msg.sender,
            false
        );
        emit MedicineAdded(medicineCount, _name, _quantity, _basePrice);
    }

    // Start an auction
    function startAuction(uint256 _medicineId) public {
        require(medicines[_medicineId].owner == msg.sender, "Only owner can start auction");
        require(!medicines[_medicineId].onAuction, "Already on auction");

        medicines[_medicineId].onAuction = true;
        auctions[_medicineId] = Auction(_medicineId, 0, address(0), true);

        emit AuctionStarted(_medicineId, medicines[_medicineId].basePrice);
    }

    // Place a bid
    function placeBid(uint256 _medicineId) public payable {
        require(auctions[_medicineId].active, "Auction not active");
        require(msg.value > auctions[_medicineId].highestBid, "Bid must be higher");

        if (auctions[_medicineId].highestBidder != address(0)) {
            payable(auctions[_medicineId].highestBidder).transfer(auctions[_medicineId].highestBid);
        }

        auctions[_medicineId].highestBid = msg.value;
        auctions[_medicineId].highestBidder = msg.sender;

        emit NewBid(_medicineId, msg.sender, msg.value);
    }

    // End an auction
    function endAuction(uint256 _medicineId) public {
        require(medicines[_medicineId].owner == msg.sender, "Only owner can end auction");
        require(auctions[_medicineId].active, "Auction not active");

        auctions[_medicineId].active = false;
        medicines[_medicineId].onAuction = false;

        if (auctions[_medicineId].highestBidder != address(0)) {
            medicines[_medicineId].owner = auctions[_medicineId].highestBidder;
            payable(msg.sender).transfer(auctions[_medicineId].highestBid);
        }

        emit AuctionEnded(_medicineId, auctions[_medicineId].highestBidder, auctions[_medicineId].highestBid);
    }

    // 🔍 New: Get all medicines
    function getAllMedicines() public view returns (Medicine[] memory) {
        Medicine[] memory result = new Medicine[](medicineCount);
        for (uint256 i = 1; i <= medicineCount; i++) {
            result[i - 1] = medicines[i];
        }
        return result;
    }
}
