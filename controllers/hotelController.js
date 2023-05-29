import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
// Create hotel
export const createHotel = async (req, res) => {
  let dataStr = req.body.city;
  let lower = dataStr.toString().toLowerCase();
  req.body.city = lower;
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    res.status(500).json({ message: "hotels route create problem" }, err);
  }
};
// Update hotel
export const updateHotel = async (req, res) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    res.status(500).json({ message: "hotels route update problem" }, err);
  }
};
// delete hotel
export const deleteHotel = async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "hotel has been deleted" });
  } catch (err) {
    res.status(500).json({ message: "hotels route delete problem" }, err);
  }
};
// Get All hotels
export const getHotels = async (req, res) => {
  const { min, max, city, ...others } = req.query;
  try {
    let searchDest = city;
    let hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $lt: max || 100000, $gt: min || 1 },
    }).limit(req.query.limit);

    if (searchDest) {
      hotels = hotels.filter((hotel) => hotel.city.includes(searchDest));
    }

    res.status(200).json(hotels);
  } catch (err) {
    res.status(500).json({ message: "hotels route delete problem" }, err);
  }
};
// Get One hotel
export const getHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    res.status(500).json({ message: "hotels route get problem" }, err);
  }
};
// Get hotels count by City
export const countByCity = async (req, res) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json({ message: "hotels route delete problem" }, err);
  }
};

// Get hotels count by Type
export const countByType = async (req, res) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartment", count: apartmentCount },
      { type: "resort", count: resortCount },
      { type: "villa", count: villaCount },
      { type: "cabin", count: cabinCount },
    ]);
  } catch (err) {
    res.status(500).json({ message: "hotels route delete problem" }, err);
  }
};
// get Hotel's Room
export const getHotelRooms = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json({ message: "hotels route get hotelRooms problem" });
  }
};
