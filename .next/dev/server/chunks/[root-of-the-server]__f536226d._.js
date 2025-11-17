module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/Documents/GitHub/My-project/lib/onechain-server-config.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// This file should only be imported on the server (API routes, Server Actions, etc.)
__turbopack_context__.s([
    "ONECHAIN_SERVER_CONFIG",
    ()=>ONECHAIN_SERVER_CONFIG
]);
const ONECHAIN_SERVER_CONFIG = {
    // OneChain RPC endpoint
    rpcUrl: process.env.ONECHAIN_RPC_URL || "https://rpc.onechain.network",
    // OneChain contract addresses - SENSITIVE, server-only
    gameContract: process.env.GAME_CONTRACT_ADDRESS || "",
    tokenContract: process.env.TOKEN_CONTRACT_ADDRESS || "",
    // Chain configuration
    chainId: 1,
    chainName: "OneChain",
    nativeCurrency: {
        name: "ONE",
        symbol: "ONE",
        decimals: 18
    },
    // Gas settings
    gasLimit: "300000",
    gasPrice: "20000000000"
};
}),
"[project]/Documents/GitHub/My-project/app/api/wallet/connect/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$My$2d$project$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/My-project/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$My$2d$project$2f$lib$2f$onechain$2d$server$2d$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/My-project/lib/onechain-server-config.ts [app-route] (ecmascript)");
;
;
async function POST(request) {
    try {
        const { walletName } = await request.json();
        // In production, you would:
        // 1. Use ethers.js to connect to OneChain RPC via ONECHAIN_SERVER_CONFIG.rpcUrl
        // 2. Validate wallet signature
        // 3. Store session data
        // For now, we'll return a mock address for demonstration
        const mockAddress = `0x${Math.random().toString(16).substring(2, 42)}`;
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$My$2d$project$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            address: mockAddress,
            walletName,
            chainId: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$My$2d$project$2f$lib$2f$onechain$2d$server$2d$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ONECHAIN_SERVER_CONFIG"].chainId,
            network: "OneChain"
        });
    } catch (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$My$2d$project$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: "Failed to connect wallet"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__f536226d._.js.map