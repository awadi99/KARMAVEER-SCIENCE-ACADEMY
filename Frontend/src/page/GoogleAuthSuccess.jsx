import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import apiClient from "../api/apiClient.js";

const GoogleAuthSuccess = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    useEffect(() => {
        const token = searchParams.get("token");
        const redirectPath = searchParams.get("redirect") || "/dashboard";

        if (!token) {
            navigate("/login?error=auth_failed", { replace: true });
            return;
        }

        localStorage.setItem("jwt", token);

        apiClient.get("/auth/me")
            .then(({ data }) => {
                queryClient.setQueryData(["authUser"], data);
                navigate(redirectPath, { replace: true });
            })
            .catch(() => {
                localStorage.removeItem("jwt");
                navigate("/login?error=auth_failed", { replace: true });
            });

    }, []);

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh"
        }}>
            <p>Signing you in, please wait...</p>
        </div>
    );
};

export default GoogleAuthSuccess;