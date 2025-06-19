const roleMiddleware = (req, res, next) => {
    console.log("Checking Admin Access:", req.user);
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied: Admins only" });
    }
    next(); // Proceed if user is an admin
};

export default roleMiddleware;