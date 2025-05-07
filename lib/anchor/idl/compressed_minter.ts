export type CompressedMinter = {
  "version": "0.1.0",
  "name": "compressed_minter",
  "instructions": [
    {
      "name": "setPriceLock",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "minter",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "extensions",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "newLock",
          "type": "u64"
        }
      ]
    },
    {
      "name": "brick",
      "accounts": [
        {
          "name": "machine",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "uri",
          "type": "string"
        }
      ]
    },
    {
      "name": "createMinter",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "seed",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "minter",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nameBank",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "createMinterInput",
          "type": {
            "defined": "CreateMinterInput"
          }
        }
      ]
    },
    {
      "name": "updateMachine",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "machine",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "input",
          "type": {
            "defined": "UpdateInput"
          }
        }
      ]
    },
    {
      "name": "initMachine",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "machine",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "libreplexRoyaltyHook",
          "isMut": false,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "royaltyProgramList",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        }
      ],
      "args": [
        {
          "name": "input",
          "type": {
            "defined": "InitInput"
          }
        }
      ]
    },
    {
      "name": "writeMultipliers",
      "accounts": [
        {
          "name": "machine",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "multiplier",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "start",
          "type": "u32"
        },
        {
          "name": "data",
          "type": "bytes"
        }
      ]
    },
    {
      "name": "resizeMultiplers",
      "accounts": [
        {
          "name": "machine",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "multiplier",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "input",
          "type": {
            "defined": "ResizeInput"
          }
        }
      ]
    },
    {
      "name": "relinquishCosigner",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "machine",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "deployment",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "fairLaunch",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "swapToFungible",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "machine",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "deployment",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "fungibleMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "hashlistMarker",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fungibleSourceTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fungibleTargetTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nonFungibleMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nonFungibleSourceTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nonFungibleTargetTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram22",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sysvarInstructions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "fairLaunchProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "t22LiquidMint",
      "accounts": [
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "requiredSigner",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "machine",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "multipliers",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "totalMints",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "wallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "wallet2",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "buyerWlTokenWallet",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "wlNftMetadata",
          "isMut": false,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "mintsPerWlNft",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "whitelistMint",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "buyerPaymentTokenWallet",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "instructionSysvarAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "token22Program",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "accountCompressionProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "noopProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "recentSlothashes",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "bubblegumProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "wlNftTree",
          "isMut": false,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "wlNftTreeAuthority",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "liquidity",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "deploymentFungibleTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "deploymentNonFungibleTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "deployment",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "deploymentConfig",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "hashlist",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "hashlistMarker",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pooledHashlistMarket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fungibleMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "liquidityFungibleTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nonFungibleMint",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "nonFungibleTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pooledNonFungibleMint",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "pooledNonFungibleTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fairLaunch",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "liquidityProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "libreplexRoyaltyHook",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "royaltyHookExtraAccountMeta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pooledRoyaltyHookExtraAccountMeta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "globalDenyListAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "collectionRoyaltyListAccount",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "input",
          "type": {
            "defined": "MachineMintInput"
          }
        }
      ]
    },
    {
      "name": "fairlaunchMint",
      "accounts": [
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "requiredSigner",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "machine",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "multipliers",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "totalMints",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "wallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "wallet2",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "buyerWlTokenWallet",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "wlNftMetadata",
          "isMut": false,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "mintsPerWlNft",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "whitelistMint",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "buyerPaymentTokenWallet",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "instructionSysvarAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "token22Program",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "accountCompressionProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "noopProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "recentSlothashes",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "bubblegumProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "wlNftTree",
          "isMut": false,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "wlNftTreeAuthority",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "deploymentFungibleTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "deploymentNonFungibleTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "deployment",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "deploymentConfig",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "hashlist",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "hashlistMarker",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fungibleMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nonFungibleMint",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "nonFungibleTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fairLaunch",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "libreplexRoyaltyHook",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "royaltyHookExtraAccountMeta",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "input",
          "type": {
            "defined": "MachineMintInput"
          }
        }
      ]
    },
    {
      "name": "setName",
      "accounts": [
        {
          "name": "machine",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        }
      ]
    },
    {
      "name": "mintV2",
      "accounts": [
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "requiredSigner",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "minter",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nameBank",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fazeState",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "extension",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "totalMints",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treeAdmin",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "wallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "wallet2",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "buyerWlTokenWallet",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "wlNftMetadata",
          "isMut": false,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "mintsPerWlNft",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "whitelistMint",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "buyerPaymentTokenWallet",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "instructionSysvarAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "collectionMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "collectionMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionMasterEdition",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "collectionAuthorityRecord",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "bubblegumSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "treeAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "accountCompressionProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "noopProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "recentSlothashes",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "bubblegumProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "wlNftTree",
          "isMut": false,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "tree",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "wlNftTreeAuthority",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        }
      ],
      "args": [
        {
          "name": "mintInput",
          "type": {
            "defined": "MintInput"
          }
        },
        {
          "name": "entry",
          "type": {
            "option": {
              "defined": "CNFTWhitelistEntry"
            }
          }
        },
        {
          "name": "toggleState",
          "type": "u8"
        }
      ]
    },
    {
      "name": "editMinter",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "minter",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "extensions",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "editMinterInput",
          "type": {
            "defined": "EditMinterInput"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "extensions",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "priceLock",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "requiredSigner",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "flags",
            "type": {
              "array": [
                "u8",
                200
              ]
            }
          }
        ]
      }
    },
    {
      "name": "minter",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "seed",
            "type": "publicKey"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "ordered",
            "type": "bool"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "url",
            "type": "string"
          },
          {
            "name": "symbol",
            "type": "string"
          },
          {
            "name": "creators",
            "type": {
              "vec": {
                "defined": "Creator"
              }
            }
          },
          {
            "name": "sellerFeeBasisPoints",
            "type": "u16"
          },
          {
            "name": "supply",
            "type": "u32"
          },
          {
            "name": "sold",
            "type": "u32"
          },
          {
            "name": "collection",
            "type": "publicKey"
          },
          {
            "name": "salePhases",
            "type": {
              "vec": {
                "defined": "SaleFaze"
              }
            }
          }
        ]
      }
    },
    {
      "name": "multipliers",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "mintMachine",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "seed",
            "type": "publicKey"
          },
          {
            "name": "tableSlot",
            "type": "u64"
          },
          {
            "name": "data",
            "type": {
              "defined": "MachineData"
            }
          },
          {
            "name": "sold",
            "type": "u32"
          },
          {
            "name": "machineType",
            "type": {
              "defined": "MachineType"
            }
          },
          {
            "name": "royaltyEnforced",
            "type": "u8"
          },
          {
            "name": "frozen",
            "type": "u8"
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                62
              ]
            }
          },
          {
            "name": "salePhases",
            "type": {
              "vec": {
                "defined": "MachinePhase"
              }
            }
          },
          {
            "name": "fundReceivers",
            "type": {
              "vec": {
                "defined": "Creator"
              }
            }
          }
        ]
      }
    },
    {
      "name": "totalMints",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "total",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "nameBank",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "minter",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "fazeState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mints",
            "type": "u32"
          },
          {
            "name": "maxMints",
            "type": {
              "option": "u32"
            }
          },
          {
            "name": "endTime",
            "type": {
              "option": "i64"
            }
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                24
              ]
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "CreateMinterInput",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "ordered",
            "type": "bool"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "url",
            "type": "string"
          },
          {
            "name": "creators",
            "type": {
              "vec": {
                "defined": "Creator"
              }
            }
          },
          {
            "name": "sellerFeeBasisPoints",
            "type": "u16"
          },
          {
            "name": "supply",
            "type": "u32"
          },
          {
            "name": "collection",
            "type": "publicKey"
          },
          {
            "name": "salePhases",
            "type": {
              "vec": {
                "defined": "SaleFaze"
              }
            }
          },
          {
            "name": "symbol",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "EditMinterInput",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "salePhases",
            "type": {
              "vec": {
                "defined": "SaleFaze"
              }
            }
          },
          {
            "name": "symbol",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "EditPhaseInput",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "maxMints",
            "type": {
              "option": "u32"
            }
          }
        ]
      }
    },
    {
      "name": "ResizeInput",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "targetSize",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "InitInput",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "seed",
            "type": "publicKey"
          },
          {
            "name": "data",
            "type": {
              "defined": "MachineData"
            }
          },
          {
            "name": "machineType",
            "type": {
              "defined": "MachineType"
            }
          },
          {
            "name": "salePhases",
            "type": {
              "vec": {
                "defined": "MachinePhase"
              }
            }
          },
          {
            "name": "fundReceivers",
            "type": {
              "vec": {
                "defined": "Creator"
              }
            }
          },
          {
            "name": "tableSlot",
            "type": "u64"
          },
          {
            "name": "enforceRoyalties",
            "type": "bool"
          },
          {
            "name": "frozen",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "UpdateInput",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "data",
            "type": {
              "option": {
                "defined": "MachineData"
              }
            }
          },
          {
            "name": "machineType",
            "type": {
              "option": {
                "defined": "MachineType"
              }
            }
          },
          {
            "name": "salePhases",
            "type": {
              "option": {
                "vec": {
                  "defined": "MachinePhase"
                }
              }
            }
          },
          {
            "name": "fundReceivers",
            "type": {
              "option": {
                "vec": {
                  "defined": "Creator"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "MachineMintInput",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "proof",
            "type": {
              "vec": {
                "array": [
                  "u8",
                  32
                ]
              }
            }
          },
          {
            "name": "expectedPrice",
            "type": "u64"
          },
          {
            "name": "amount",
            "type": "u32"
          },
          {
            "name": "cnftWlEntry",
            "type": {
              "option": {
                "defined": "CNFTWhitelistEntry"
              }
            }
          },
          {
            "name": "targetPhase",
            "type": {
              "option": "u8"
            }
          }
        ]
      }
    },
    {
      "name": "MintInput",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "proof",
            "type": {
              "vec": {
                "array": [
                  "u8",
                  32
                ]
              }
            }
          },
          {
            "name": "expectedPrice",
            "type": "u64"
          },
          {
            "name": "amount",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "CNFTWhitelistEntry",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "root",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "dataHash",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "creatorHash",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "assetId",
            "type": "publicKey"
          },
          {
            "name": "nonce",
            "type": "u64"
          },
          {
            "name": "index",
            "type": "u32"
          },
          {
            "name": "creators",
            "type": {
              "vec": {
                "defined": "BGumCreator"
              }
            }
          }
        ]
      }
    },
    {
      "name": "MachineData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "ordered",
            "type": "bool"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "url",
            "type": "string"
          },
          {
            "name": "symbol",
            "type": "string"
          },
          {
            "name": "creators",
            "type": {
              "vec": {
                "defined": "Creator"
              }
            }
          },
          {
            "name": "sellerFeeBasisPoints",
            "type": "u16"
          },
          {
            "name": "supply",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "MachinePhase",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "start",
            "type": "i64"
          },
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "currency",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "whitelistMode",
            "type": {
              "defined": "WhitelistMode"
            }
          },
          {
            "name": "end",
            "type": {
              "option": "i64"
            }
          },
          {
            "name": "globalMintLimit",
            "type": {
              "option": "u32"
            }
          },
          {
            "name": "mintsInPhase",
            "type": "u32"
          },
          {
            "name": "requiredSigner",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                10
              ]
            }
          }
        ]
      }
    },
    {
      "name": "Creator",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "address",
            "type": "publicKey"
          },
          {
            "name": "share",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "BGumCreator",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "address",
            "type": "publicKey"
          },
          {
            "name": "verified",
            "type": "bool"
          },
          {
            "name": "share",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "SaleFaze",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "start",
            "type": "i64"
          },
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "currency",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "whitelistMode",
            "type": {
              "defined": "WhitelistMode"
            }
          },
          {
            "name": "name",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "PublicMode",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mintsPerUser",
            "type": {
              "option": "u32"
            }
          }
        ]
      }
    },
    {
      "name": "WhitelistTokenMode",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tokenMint",
            "type": "publicKey"
          },
          {
            "name": "burn",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "NFTHolderMode",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "verifiedCreator",
            "type": "publicKey"
          },
          {
            "name": "mintsPerNft",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "WhitelistWalletListMode",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mintsPerUser",
            "type": "u32"
          },
          {
            "name": "merkleRoot",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          }
        ]
      }
    },
    {
      "name": "RevealState",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "NotAllowed"
          },
          {
            "name": "Allowed",
            "fields": [
              {
                "name": "uri",
                "type": "string"
              }
            ]
          }
        ]
      }
    },
    {
      "name": "MachineType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Compressed",
            "fields": [
              {
                "name": "collection",
                "type": "publicKey"
              }
            ]
          },
          {
            "name": "FairLaunch",
            "fields": [
              {
                "name": "deployment",
                "type": "publicKey"
              }
            ]
          },
          {
            "name": "Liquid",
            "fields": [
              {
                "name": "liquidity",
                "type": "publicKey"
              },
              {
                "name": "url",
                "type": "string"
              }
            ]
          }
        ]
      }
    },
    {
      "name": "WhitelistMode",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "WalletBased",
            "fields": [
              {
                "name": "info",
                "type": {
                  "defined": "WhitelistWalletListMode"
                }
              }
            ]
          },
          {
            "name": "TokenBased",
            "fields": [
              {
                "name": "info",
                "type": {
                  "defined": "WhitelistTokenMode"
                }
              }
            ]
          },
          {
            "name": "Public",
            "fields": [
              {
                "name": "info",
                "type": {
                  "defined": "PublicMode"
                }
              }
            ]
          },
          {
            "name": "NFTBased",
            "fields": [
              {
                "name": "info",
                "type": {
                  "defined": "NFTHolderMode"
                }
              }
            ]
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "MintEvent",
      "fields": [
        {
          "name": "collection",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "number",
          "type": "u32",
          "index": false
        },
        {
          "name": "authority",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "holder",
          "type": "publicKey",
          "index": false
        }
      ]
    },
    {
      "name": "MintEventV2",
      "fields": [
        {
          "name": "mintId",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "url",
          "type": "string",
          "index": false
        },
        {
          "name": "authority",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "machine",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "pooled",
          "type": "bool",
          "index": false
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "NotLive"
    },
    {
      "code": 6001,
      "name": "NotWhitelisted"
    },
    {
      "code": 6002,
      "name": "PersonalLimit"
    },
    {
      "code": 6003,
      "name": "NumericalOverflowError"
    },
    {
      "code": 6004,
      "name": "PriceViolation"
    },
    {
      "code": 6005,
      "name": "IncorrectOwner"
    },
    {
      "code": 6006,
      "name": "NotEnoughTokens"
    },
    {
      "code": 6007,
      "name": "MissingPaymentWallet"
    },
    {
      "code": 6008,
      "name": "IncorrectCurrencyWallet"
    },
    {
      "code": 6009,
      "name": "NotEnoughSOL"
    },
    {
      "code": 6010,
      "name": "InvalidCollection"
    },
    {
      "code": 6011,
      "name": "PriceLockViolation"
    },
    {
      "code": 6012,
      "name": "CannotIncreasePriceLock"
    },
    {
      "code": 6013,
      "name": "RequiredSignerViolation"
    },
    {
      "code": 6014,
      "name": "InvalidFazeState"
    },
    {
      "code": 6015,
      "name": "GlobalMintLimit"
    },
    {
      "code": 6016,
      "name": "SoldOut"
    },
    {
      "code": 6017,
      "name": "MissingAccount"
    }
  ]
};

export const IDL: CompressedMinter = {
  "version": "0.1.0",
  "name": "compressed_minter",
  "instructions": [
    {
      "name": "setPriceLock",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "minter",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "extensions",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "newLock",
          "type": "u64"
        }
      ]
    },
    {
      "name": "brick",
      "accounts": [
        {
          "name": "machine",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "uri",
          "type": "string"
        }
      ]
    },
    {
      "name": "createMinter",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "seed",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "minter",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nameBank",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "createMinterInput",
          "type": {
            "defined": "CreateMinterInput"
          }
        }
      ]
    },
    {
      "name": "updateMachine",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "machine",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "input",
          "type": {
            "defined": "UpdateInput"
          }
        }
      ]
    },
    {
      "name": "initMachine",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "machine",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "libreplexRoyaltyHook",
          "isMut": false,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "royaltyProgramList",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        }
      ],
      "args": [
        {
          "name": "input",
          "type": {
            "defined": "InitInput"
          }
        }
      ]
    },
    {
      "name": "writeMultipliers",
      "accounts": [
        {
          "name": "machine",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "multiplier",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "start",
          "type": "u32"
        },
        {
          "name": "data",
          "type": "bytes"
        }
      ]
    },
    {
      "name": "resizeMultiplers",
      "accounts": [
        {
          "name": "machine",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "multiplier",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "input",
          "type": {
            "defined": "ResizeInput"
          }
        }
      ]
    },
    {
      "name": "relinquishCosigner",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "machine",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "deployment",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "fairLaunch",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "swapToFungible",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "machine",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "deployment",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "fungibleMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "hashlistMarker",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fungibleSourceTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fungibleTargetTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nonFungibleMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nonFungibleSourceTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nonFungibleTargetTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram22",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sysvarInstructions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "fairLaunchProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "t22LiquidMint",
      "accounts": [
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "requiredSigner",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "machine",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "multipliers",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "totalMints",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "wallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "wallet2",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "buyerWlTokenWallet",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "wlNftMetadata",
          "isMut": false,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "mintsPerWlNft",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "whitelistMint",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "buyerPaymentTokenWallet",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "instructionSysvarAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "token22Program",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "accountCompressionProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "noopProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "recentSlothashes",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "bubblegumProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "wlNftTree",
          "isMut": false,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "wlNftTreeAuthority",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "liquidity",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "deploymentFungibleTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "deploymentNonFungibleTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "deployment",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "deploymentConfig",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "hashlist",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "hashlistMarker",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pooledHashlistMarket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fungibleMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "liquidityFungibleTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nonFungibleMint",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "nonFungibleTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pooledNonFungibleMint",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "pooledNonFungibleTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fairLaunch",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "liquidityProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "libreplexRoyaltyHook",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "royaltyHookExtraAccountMeta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pooledRoyaltyHookExtraAccountMeta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "globalDenyListAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "collectionRoyaltyListAccount",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "input",
          "type": {
            "defined": "MachineMintInput"
          }
        }
      ]
    },
    {
      "name": "fairlaunchMint",
      "accounts": [
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "requiredSigner",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "machine",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "multipliers",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "totalMints",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "wallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "wallet2",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "buyerWlTokenWallet",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "wlNftMetadata",
          "isMut": false,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "mintsPerWlNft",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "whitelistMint",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "buyerPaymentTokenWallet",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "instructionSysvarAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "token22Program",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "accountCompressionProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "noopProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "recentSlothashes",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "bubblegumProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "wlNftTree",
          "isMut": false,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "wlNftTreeAuthority",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "deploymentFungibleTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "deploymentNonFungibleTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "deployment",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "deploymentConfig",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "hashlist",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "hashlistMarker",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fungibleMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nonFungibleMint",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "nonFungibleTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fairLaunch",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "libreplexRoyaltyHook",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "royaltyHookExtraAccountMeta",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "input",
          "type": {
            "defined": "MachineMintInput"
          }
        }
      ]
    },
    {
      "name": "setName",
      "accounts": [
        {
          "name": "machine",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        }
      ]
    },
    {
      "name": "mintV2",
      "accounts": [
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "requiredSigner",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "minter",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nameBank",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fazeState",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "extension",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "totalMints",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treeAdmin",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "wallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "wallet2",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "buyerWlTokenWallet",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "wlNftMetadata",
          "isMut": false,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "mintsPerWlNft",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "whitelistMint",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "buyerPaymentTokenWallet",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "instructionSysvarAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "collectionMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "collectionMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionMasterEdition",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "collectionAuthorityRecord",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "bubblegumSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "treeAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "accountCompressionProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "noopProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "recentSlothashes",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "bubblegumProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "wlNftTree",
          "isMut": false,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "tree",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "wlNftTreeAuthority",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        }
      ],
      "args": [
        {
          "name": "mintInput",
          "type": {
            "defined": "MintInput"
          }
        },
        {
          "name": "entry",
          "type": {
            "option": {
              "defined": "CNFTWhitelistEntry"
            }
          }
        },
        {
          "name": "toggleState",
          "type": "u8"
        }
      ]
    },
    {
      "name": "editMinter",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "minter",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "extensions",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "editMinterInput",
          "type": {
            "defined": "EditMinterInput"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "extensions",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "priceLock",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "requiredSigner",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "flags",
            "type": {
              "array": [
                "u8",
                200
              ]
            }
          }
        ]
      }
    },
    {
      "name": "minter",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "seed",
            "type": "publicKey"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "ordered",
            "type": "bool"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "url",
            "type": "string"
          },
          {
            "name": "symbol",
            "type": "string"
          },
          {
            "name": "creators",
            "type": {
              "vec": {
                "defined": "Creator"
              }
            }
          },
          {
            "name": "sellerFeeBasisPoints",
            "type": "u16"
          },
          {
            "name": "supply",
            "type": "u32"
          },
          {
            "name": "sold",
            "type": "u32"
          },
          {
            "name": "collection",
            "type": "publicKey"
          },
          {
            "name": "salePhases",
            "type": {
              "vec": {
                "defined": "SaleFaze"
              }
            }
          }
        ]
      }
    },
    {
      "name": "multipliers",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "mintMachine",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "seed",
            "type": "publicKey"
          },
          {
            "name": "tableSlot",
            "type": "u64"
          },
          {
            "name": "data",
            "type": {
              "defined": "MachineData"
            }
          },
          {
            "name": "sold",
            "type": "u32"
          },
          {
            "name": "machineType",
            "type": {
              "defined": "MachineType"
            }
          },
          {
            "name": "royaltyEnforced",
            "type": "u8"
          },
          {
            "name": "frozen",
            "type": "u8"
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                62
              ]
            }
          },
          {
            "name": "salePhases",
            "type": {
              "vec": {
                "defined": "MachinePhase"
              }
            }
          },
          {
            "name": "fundReceivers",
            "type": {
              "vec": {
                "defined": "Creator"
              }
            }
          }
        ]
      }
    },
    {
      "name": "totalMints",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "total",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "nameBank",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "minter",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "fazeState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mints",
            "type": "u32"
          },
          {
            "name": "maxMints",
            "type": {
              "option": "u32"
            }
          },
          {
            "name": "endTime",
            "type": {
              "option": "i64"
            }
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                24
              ]
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "CreateMinterInput",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "ordered",
            "type": "bool"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "url",
            "type": "string"
          },
          {
            "name": "creators",
            "type": {
              "vec": {
                "defined": "Creator"
              }
            }
          },
          {
            "name": "sellerFeeBasisPoints",
            "type": "u16"
          },
          {
            "name": "supply",
            "type": "u32"
          },
          {
            "name": "collection",
            "type": "publicKey"
          },
          {
            "name": "salePhases",
            "type": {
              "vec": {
                "defined": "SaleFaze"
              }
            }
          },
          {
            "name": "symbol",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "EditMinterInput",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "salePhases",
            "type": {
              "vec": {
                "defined": "SaleFaze"
              }
            }
          },
          {
            "name": "symbol",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "EditPhaseInput",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "maxMints",
            "type": {
              "option": "u32"
            }
          }
        ]
      }
    },
    {
      "name": "ResizeInput",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "targetSize",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "InitInput",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "seed",
            "type": "publicKey"
          },
          {
            "name": "data",
            "type": {
              "defined": "MachineData"
            }
          },
          {
            "name": "machineType",
            "type": {
              "defined": "MachineType"
            }
          },
          {
            "name": "salePhases",
            "type": {
              "vec": {
                "defined": "MachinePhase"
              }
            }
          },
          {
            "name": "fundReceivers",
            "type": {
              "vec": {
                "defined": "Creator"
              }
            }
          },
          {
            "name": "tableSlot",
            "type": "u64"
          },
          {
            "name": "enforceRoyalties",
            "type": "bool"
          },
          {
            "name": "frozen",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "UpdateInput",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "data",
            "type": {
              "option": {
                "defined": "MachineData"
              }
            }
          },
          {
            "name": "machineType",
            "type": {
              "option": {
                "defined": "MachineType"
              }
            }
          },
          {
            "name": "salePhases",
            "type": {
              "option": {
                "vec": {
                  "defined": "MachinePhase"
                }
              }
            }
          },
          {
            "name": "fundReceivers",
            "type": {
              "option": {
                "vec": {
                  "defined": "Creator"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "MachineMintInput",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "proof",
            "type": {
              "vec": {
                "array": [
                  "u8",
                  32
                ]
              }
            }
          },
          {
            "name": "expectedPrice",
            "type": "u64"
          },
          {
            "name": "amount",
            "type": "u32"
          },
          {
            "name": "cnftWlEntry",
            "type": {
              "option": {
                "defined": "CNFTWhitelistEntry"
              }
            }
          },
          {
            "name": "targetPhase",
            "type": {
              "option": "u8"
            }
          }
        ]
      }
    },
    {
      "name": "MintInput",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "proof",
            "type": {
              "vec": {
                "array": [
                  "u8",
                  32
                ]
              }
            }
          },
          {
            "name": "expectedPrice",
            "type": "u64"
          },
          {
            "name": "amount",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "CNFTWhitelistEntry",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "root",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "dataHash",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "creatorHash",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "assetId",
            "type": "publicKey"
          },
          {
            "name": "nonce",
            "type": "u64"
          },
          {
            "name": "index",
            "type": "u32"
          },
          {
            "name": "creators",
            "type": {
              "vec": {
                "defined": "BGumCreator"
              }
            }
          }
        ]
      }
    },
    {
      "name": "MachineData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "ordered",
            "type": "bool"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "url",
            "type": "string"
          },
          {
            "name": "symbol",
            "type": "string"
          },
          {
            "name": "creators",
            "type": {
              "vec": {
                "defined": "Creator"
              }
            }
          },
          {
            "name": "sellerFeeBasisPoints",
            "type": "u16"
          },
          {
            "name": "supply",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "MachinePhase",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "start",
            "type": "i64"
          },
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "currency",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "whitelistMode",
            "type": {
              "defined": "WhitelistMode"
            }
          },
          {
            "name": "end",
            "type": {
              "option": "i64"
            }
          },
          {
            "name": "globalMintLimit",
            "type": {
              "option": "u32"
            }
          },
          {
            "name": "mintsInPhase",
            "type": "u32"
          },
          {
            "name": "requiredSigner",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                10
              ]
            }
          }
        ]
      }
    },
    {
      "name": "Creator",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "address",
            "type": "publicKey"
          },
          {
            "name": "share",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "BGumCreator",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "address",
            "type": "publicKey"
          },
          {
            "name": "verified",
            "type": "bool"
          },
          {
            "name": "share",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "SaleFaze",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "start",
            "type": "i64"
          },
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "currency",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "whitelistMode",
            "type": {
              "defined": "WhitelistMode"
            }
          },
          {
            "name": "name",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "PublicMode",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mintsPerUser",
            "type": {
              "option": "u32"
            }
          }
        ]
      }
    },
    {
      "name": "WhitelistTokenMode",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tokenMint",
            "type": "publicKey"
          },
          {
            "name": "burn",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "NFTHolderMode",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "verifiedCreator",
            "type": "publicKey"
          },
          {
            "name": "mintsPerNft",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "WhitelistWalletListMode",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mintsPerUser",
            "type": "u32"
          },
          {
            "name": "merkleRoot",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          }
        ]
      }
    },
    {
      "name": "RevealState",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "NotAllowed"
          },
          {
            "name": "Allowed",
            "fields": [
              {
                "name": "uri",
                "type": "string"
              }
            ]
          }
        ]
      }
    },
    {
      "name": "MachineType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Compressed",
            "fields": [
              {
                "name": "collection",
                "type": "publicKey"
              }
            ]
          },
          {
            "name": "FairLaunch",
            "fields": [
              {
                "name": "deployment",
                "type": "publicKey"
              }
            ]
          },
          {
            "name": "Liquid",
            "fields": [
              {
                "name": "liquidity",
                "type": "publicKey"
              },
              {
                "name": "url",
                "type": "string"
              }
            ]
          }
        ]
      }
    },
    {
      "name": "WhitelistMode",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "WalletBased",
            "fields": [
              {
                "name": "info",
                "type": {
                  "defined": "WhitelistWalletListMode"
                }
              }
            ]
          },
          {
            "name": "TokenBased",
            "fields": [
              {
                "name": "info",
                "type": {
                  "defined": "WhitelistTokenMode"
                }
              }
            ]
          },
          {
            "name": "Public",
            "fields": [
              {
                "name": "info",
                "type": {
                  "defined": "PublicMode"
                }
              }
            ]
          },
          {
            "name": "NFTBased",
            "fields": [
              {
                "name": "info",
                "type": {
                  "defined": "NFTHolderMode"
                }
              }
            ]
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "MintEvent",
      "fields": [
        {
          "name": "collection",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "number",
          "type": "u32",
          "index": false
        },
        {
          "name": "authority",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "holder",
          "type": "publicKey",
          "index": false
        }
      ]
    },
    {
      "name": "MintEventV2",
      "fields": [
        {
          "name": "mintId",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "url",
          "type": "string",
          "index": false
        },
        {
          "name": "authority",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "machine",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "pooled",
          "type": "bool",
          "index": false
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "NotLive"
    },
    {
      "code": 6001,
      "name": "NotWhitelisted"
    },
    {
      "code": 6002,
      "name": "PersonalLimit"
    },
    {
      "code": 6003,
      "name": "NumericalOverflowError"
    },
    {
      "code": 6004,
      "name": "PriceViolation"
    },
    {
      "code": 6005,
      "name": "IncorrectOwner"
    },
    {
      "code": 6006,
      "name": "NotEnoughTokens"
    },
    {
      "code": 6007,
      "name": "MissingPaymentWallet"
    },
    {
      "code": 6008,
      "name": "IncorrectCurrencyWallet"
    },
    {
      "code": 6009,
      "name": "NotEnoughSOL"
    },
    {
      "code": 6010,
      "name": "InvalidCollection"
    },
    {
      "code": 6011,
      "name": "PriceLockViolation"
    },
    {
      "code": 6012,
      "name": "CannotIncreasePriceLock"
    },
    {
      "code": 6013,
      "name": "RequiredSignerViolation"
    },
    {
      "code": 6014,
      "name": "InvalidFazeState"
    },
    {
      "code": 6015,
      "name": "GlobalMintLimit"
    },
    {
      "code": 6016,
      "name": "SoldOut"
    },
    {
      "code": 6017,
      "name": "MissingAccount"
    }
  ]
};
