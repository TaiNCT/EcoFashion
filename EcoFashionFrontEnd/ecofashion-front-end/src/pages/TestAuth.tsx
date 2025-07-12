import { useState } from "react";
import { Box, Button, Typography, Alert, Card, CardContent } from "@mui/material";
import { useAuth } from "../services/user/AuthContext";
import { apiClient } from "../services/api/baseApi";

export default function TestAuth() {
  const { user } = useAuth();
  const [testResult, setTestResult] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const testAuthentication = async () => {
    setLoading(true);
    setTestResult("");

    try {
      // Test 1: Check local storage
      const token = localStorage.getItem("authToken");
      const tokenExpiresAt = localStorage.getItem("tokenExpiresAt");
      const userInfo = localStorage.getItem("userInfo");

      console.log("🔍 Local Storage Check:", {
        hasToken: !!token,
        token: token?.substring(0, 50) + "...",
        expiresAt: tokenExpiresAt,
        isExpired: tokenExpiresAt ? new Date() > new Date(tokenExpiresAt) : "No expiry date",
        hasUserInfo: !!userInfo,
        userInfo: userInfo ? JSON.parse(userInfo) : null
      });

      let result = `✅ Token exists: ${!!token}\n`;
      result += `✅ Expires: ${tokenExpiresAt}\n`;
      result += `✅ Is expired: ${tokenExpiresAt ? new Date() > new Date(tokenExpiresAt) : "No expiry"}\n`;
      result += `✅ User info: ${!!userInfo}\n\n`;

      // Test 2: Try calling a protected API
      if (token) {
        try {
          console.log("🚀 Testing protected API call...");
          const response = await apiClient.get("/User/profile");
          result += `✅ API Call Success: ${response.status}\n`;
          result += `✅ Response: ${JSON.stringify(response.data, null, 2)}\n`;
        } catch (apiError: any) {
          console.error("❌ API Error:", apiError);
          result += `❌ API Call Failed: ${apiError.response?.status || "No status"}\n`;
          result += `❌ Error: ${apiError.response?.data?.errorMessage || apiError.message}\n`;
          result += `❌ Headers: ${JSON.stringify(apiError.config?.headers, null, 2)}\n`;
        }
      } else {
        result += `❌ No token to test API\n`;
      }

      setTestResult(result);
    } catch (error: any) {
      console.error("Test failed:", error);
      setTestResult(`❌ Test failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const clearAuth = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("tokenExpiresAt");
    localStorage.removeItem("userInfo");
    setTestResult("🧹 Cleared all auth data");
  };

  return (
    <Box sx={{ p: 4, maxWidth: 800, mx: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Authentication Test Page
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Current User Info
          </Typography>
          {user ? (
            <Box>
              <Typography>✅ User ID: {user.userId}</Typography>
              <Typography>✅ Email: {user.email}</Typography>
              <Typography>✅ Full Name: {user.fullName}</Typography>
              <Typography>✅ Role: {user.role}</Typography>
              <Typography>✅ Status: {user.status}</Typography>
            </Box>
          ) : (
            <Alert severity="warning">No user found in context</Alert>
          )}
        </CardContent>
      </Card>

      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <Button 
          variant="contained" 
          onClick={testAuthentication}
          disabled={loading}
        >
          {loading ? "Testing..." : "Test Authentication"}
        </Button>
        <Button 
          variant="outlined" 
          color="error"
          onClick={clearAuth}
        >
          Clear Auth Data
        </Button>
      </Box>

      {testResult && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Test Results
            </Typography>
            <pre style={{ 
              whiteSpace: "pre-wrap", 
              fontFamily: "monospace",
              fontSize: "12px",
              backgroundColor: "#f5f5f5",
              padding: "10px",
              borderRadius: "4px",
              overflow: "auto"
            }}>
              {testResult}
            </pre>
          </CardContent>
        </Card>
      )}
    </Box>
  );
} 