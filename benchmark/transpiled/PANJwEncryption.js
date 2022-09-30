!function(e) {
  var t = {};
  function r(n) {
    if (t[n])
      return t[n].exports;
    var o = t[n] = {
      i: n,
      l: !1,
      exports: {}
    };
    return e[n].call(o.exports, o, o.exports, r),
    o.l = !0,
    o.exports
  }
  r.m = e,
  r.c = t,
  r.d = function(e, t, n) {
    r.o(e, t) || Object.defineProperty(e, t, {
      enumerable: !0,
      get: n
    })
  }
  ,
  r.r = function(e) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
      value: "Module"
    }),
    Object.defineProperty(e, "__esModule", {
      value: !0
    })
  }
  ,
  r.t = function(e, t) {
    if (1 & t && (e = r(e)),
    8 & t)
      return e;
    if (4 & t && "object" == typeof e && e && e.__esModule)
      return e;
    var n = Object.create(null);
    if (r.r(n),
    Object.defineProperty(n, "default", {
      enumerable: !0,
      value: e
    }),
    2 & t && "string" != typeof e)
      for (var o in e)
        r.d(n, o, function(t) {
          return e[t]
        }
        .bind(null, o));
    return n
  }
  ,
  r.n = function(e) {
    var t = e && e.__esModule ? function() {
      return e.default
    }
    : function() {
      return e
    }
    ;
    return r.d(t, "a", t),
    t
  }
  ,
  r.o = function(e, t) {
    return Object.prototype.hasOwnProperty.call(e, t)
  }
  ,
  r.p = "",
  r(r.s = 2)
}([function(e, t, r) {
  (function(n) {
    r(8),
    r(9);
    var o = {}
      , i = {};
    t.setCrypto = function(e) {
      o.crypto = e
    }
    ,
    "undefined" != typeof crypto && t.setCrypto(crypto),
    "function" != typeof atob && (atob = function(e) {
      return new n(e,"base64").toString("binary")
    }
    ),
    "function" != typeof btoa && (btoa = function(e) {
      return (e instanceof n ? e : new n(e.toString(),"binary")).toString("base64")
    }
    ),
    o.caniuse = function() {
      var e = !0;
      return e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = e && "function" == typeof Promise) && "function" == typeof Promise.reject) && "function" == typeof Promise.prototype.then) && "function" == typeof Promise.all) && "object" == typeof o.crypto) && "object" == typeof o.crypto.subtle) && "function" == typeof o.crypto.getRandomValues) && "function" == typeof o.crypto.subtle.importKey) && "function" == typeof o.crypto.subtle.generateKey) && "function" == typeof o.crypto.subtle.exportKey) && "function" == typeof o.crypto.subtle.wrapKey) && "function" == typeof o.crypto.subtle.unwrapKey) && "function" == typeof o.crypto.subtle.encrypt) && "function" == typeof o.crypto.subtle.decrypt) && "function" == typeof o.crypto.subtle.sign) && "function" == typeof ArrayBuffer) && ("function" == typeof Uint8Array || "object" == typeof Uint8Array)) && ("function" == typeof Uint32Array || "object" == typeof Uint32Array)) && "object" == typeof JSON) && "function" == typeof JSON.parse) && "function" == typeof JSON.stringify) && "function" == typeof atob) && "function" == typeof btoa
    }
    ,
    o.assert = function(e, t) {
      if (!e)
        throw new Error(t)
    }
    ,
    t.Jose = o,
    t.JoseJWE = i,
    t.JoseJWS = {};
    var a = function() {
      this.setKeyEncryptionAlgorithm("RSA-OAEP"),
      this.setContentEncryptionAlgorithm("A256GCM"),
      this.setContentSignAlgorithm("RS256")
    };
    o.WebCryptographer = a,
    a.prototype.setKeyEncryptionAlgorithm = function(e) {
      this.key_encryption = s(e)
    }
    ,
    a.prototype.getKeyEncryptionAlgorithm = function() {
      return this.key_encryption.jwe_name
    }
    ,
    a.prototype.setContentEncryptionAlgorithm = function(e) {
      this.content_encryption = s(e)
    }
    ,
    a.prototype.getContentEncryptionAlgorithm = function() {
      return this.content_encryption.jwe_name
    }
    ,
    a.prototype.setContentSignAlgorithm = function(e) {
      this.content_sign = l(e)
    }
    ,
    a.prototype.getContentSignAlgorithm = function() {
      return this.content_sign.jwa_name
    }
    ,
    a.prototype.createIV = function() {
      var e = new Uint8Array(new Array(this.content_encryption.iv_bytes));
      return o.crypto.getRandomValues(e)
    }
    ,
    a.prototype.createCek = function() {
      var e = c(this.content_encryption);
      return o.crypto.subtle.generateKey(e.id, !0, e.enc_op)
    }
    ,
    a.prototype.wrapCek = function(e, t) {
      return o.crypto.subtle.wrapKey("raw", e, t, this.key_encryption.id)
    }
    ,
    a.prototype.unwrapCek = function(e, t) {
      var r = c(this.content_encryption)
        , n = this.content_encryption.specific_cek_bytes > 0
        , i = this.key_encryption.id;
      return o.crypto.subtle.unwrapKey("raw", e, t, i, r.id, n, r.dec_op)
    }
    ;
    var c = function(e) {
      var t = e.specific_cek_bytes;
      if (t) {
        if (16 == t)
          return {
            id: {
              name: "AES-CBC",
              length: 128
            },
            enc_op: ["encrypt"],
            dec_op: ["decrypt"]
          };
        if (32 == t)
          return {
            id: {
              name: "AES-CBC",
              length: 256
            },
            enc_op: ["encrypt"],
            dec_op: ["decrypt"]
          };
        if (64 == t)
          return {
            id: {
              name: "HMAC",
              hash: {
                name: "SHA-256"
              }
            },
            enc_op: ["sign"],
            dec_op: ["verify"]
          };
        if (128 == t)
          return {
            id: {
              name: "HMAC",
              hash: {
                name: "SHA-384"
              }
            },
            enc_op: ["sign"],
            dec_op: ["verify"]
          };
        o.assert(!1, "getCekWorkaround: invalid len")
      }
      return {
        id: e.id,
        enc_op: ["encrypt"],
        dec_op: ["decrypt"]
      }
    };
    a.prototype.encrypt = function(e, t, r, n) {
      var i = this.content_encryption;
      if (e.length != i.iv_bytes)
        return Promise.reject(Error("invalid IV length"));
      if (i.auth.aead) {
        var a = i.auth.tag_bytes
          , c = {
          name: i.id.name,
          iv: e,
          additionalData: t,
          tagLength: 8 * a
        };
        return r.then(function(e) {
          return o.crypto.subtle.encrypt(c, e, n).then(function(e) {
            var t = e.byteLength - a;
            return {
              cipher: e.slice(0, t),
              tag: e.slice(t)
            }
          })
        })
      }
      var s = u(i, r, ["encrypt"])
        , l = s[0]
        , p = s[1].then(function(t) {
        var r = {
          name: i.id.name,
          iv: e
        };
        return o.crypto.subtle.encrypt(r, t, n)
      })
        , h = p.then(function(r) {
        return f(i, l, t, e, r)
      });
      return Promise.all([p, h]).then(function(e) {
        return {
          cipher: e[0],
          tag: e[1]
        }
      })
    }
    ,
    a.prototype.decrypt = function(e, t, r, n, i) {
      if (r.length != this.content_encryption.iv_bytes)
        return Promise.reject(Error("decryptCiphertext: invalid IV"));
      var a = this.content_encryption;
      if (a.auth.aead) {
        var c = {
          name: a.id.name,
          iv: r,
          additionalData: t,
          tagLength: 8 * a.auth.tag_bytes
        };
        return e.then(function(e) {
          var t = d.arrayBufferConcat(n, i);
          return o.crypto.subtle.decrypt(c, e, t)
        })
      }
      var s = u(a, e, ["decrypt"])
        , l = s[0]
        , p = s[1]
        , h = f(a, l, t, r, n);
      return Promise.all([p, h]).then(function(e) {
        var t = e[0]
          , c = e[1];
        return function(e, t, r, n) {
          return o.assert(r instanceof Uint8Array, "compare: invalid input"),
          o.assert(n instanceof Uint8Array, "compare: invalid input"),
          t.then(function(t) {
            var i = o.crypto.subtle.sign(e.auth.id, t, r)
              , a = o.crypto.subtle.sign(e.auth.id, t, n);
            return Promise.all([i, a]).then(function(e) {
              var t = new Uint8Array(e[0])
                , r = new Uint8Array(e[1]);
              if (t.length != r.length)
                throw new Error("compare failed");
              for (var n = 0; n < t.length; n++)
                if (t[n] != r[n])
                  throw new Error("compare failed");
              return Promise.resolve(null)
            })
          })
        }(a, l, new Uint8Array(c), i).then(function() {
          var e = {
            name: a.id.name,
            iv: r
          };
          return o.crypto.subtle.decrypt(e, t, n)
        }).catch(function(e) {
          return Promise.reject(Error("decryptCiphertext: MAC failed."))
        })
      })
    }
    ,
    a.prototype.sign = function(e, t, r) {
      var n = this.content_sign;
      return e.alg && (n = l(e.alg)),
      r.then(function(r) {
        return o.crypto.subtle.sign(n.id, r, d.arrayFromString(d.Base64Url.encode(JSON.stringify(e)) + "." + d.Base64Url.encodeArray(t)))
      })
    }
    ,
    a.prototype.verify = function(e, t, r, n, i) {
      var a = this.content_sign;
      return n.then(function(n) {
        return a = l(p(n)),
        o.crypto.subtle.verify(a.id, n, r, d.arrayFromString(e + "." + t)).then(function(e) {
          return {
            kid: i,
            verified: e
          }
        })
      })
    }
    ,
    o.WebCryptographer.keyId = function(e) {
      return d.sha256(e.n + "+" + e.d)
    }
    ;
    var u = function(e, t, r) {
      var n = t.then(function(e) {
        return o.crypto.subtle.exportKey("raw", e)
      });
      return [n.then(function(t) {
        if (8 * t.byteLength != e.id.length + 8 * e.auth.key_bytes)
          return Promise.reject(Error("encryptPlainText: incorrect cek length"));
        var r = t.slice(0, e.auth.key_bytes);
        return o.crypto.subtle.importKey("raw", r, e.auth.id, !1, ["sign"])
      }), n.then(function(t) {
        if (8 * t.byteLength != e.id.length + 8 * e.auth.key_bytes)
          return Promise.reject(Error("encryptPlainText: incorrect cek length"));
        var n = t.slice(e.auth.key_bytes);
        return o.crypto.subtle.importKey("raw", n, e.id, !1, r)
      })]
    }
      , s = function(e) {
      switch (e) {
      case "RSA-OAEP":
        return {
          jwe_name: "RSA-OAEP",
          id: {
            name: "RSA-OAEP",
            hash: {
              name: "SHA-1"
            }
          }
        };
      case "RSA-OAEP-256":
        return {
          jwe_name: "RSA-OAEP-256",
          id: {
            name: "RSA-OAEP",
            hash: {
              name: "SHA-256"
            }
          }
        };
      case "A128KW":
        return {
          jwe_name: "A128KW",
          id: {
            name: "AES-KW",
            length: 128
          }
        };
      case "A256KW":
        return {
          jwe_name: "A256KW",
          id: {
            name: "AES-KW",
            length: 256
          }
        };
      case "dir":
        return {
          jwe_name: "dir"
        };
      case "A128CBC-HS256":
        return {
          jwe_name: "A128CBC-HS256",
          id: {
            name: "AES-CBC",
            length: 128
          },
          iv_bytes: 16,
          specific_cek_bytes: 32,
          auth: {
            key_bytes: 16,
            id: {
              name: "HMAC",
              hash: {
                name: "SHA-256"
              }
            },
            truncated_bytes: 16
          }
        };
      case "A256CBC-HS512":
        return {
          jwe_name: "A256CBC-HS512",
          id: {
            name: "AES-CBC",
            length: 256
          },
          iv_bytes: 16,
          specific_cek_bytes: 64,
          auth: {
            key_bytes: 32,
            id: {
              name: "HMAC",
              hash: {
                name: "SHA-512"
              }
            },
            truncated_bytes: 32
          }
        };
      case "A128GCM":
        return {
          jwe_name: "A128GCM",
          id: {
            name: "AES-GCM",
            length: 128
          },
          iv_bytes: 12,
          auth: {
            aead: !0,
            tag_bytes: 16
          }
        };
      case "A256GCM":
        return {
          jwe_name: "A256GCM",
          id: {
            name: "AES-GCM",
            length: 256
          },
          iv_bytes: 12,
          auth: {
            aead: !0,
            tag_bytes: 16
          }
        };
      default:
        throw Error("unsupported algorithm: " + e)
      }
    }
      , f = function(e, t, r, n, i) {
      return t.then(function(t) {
        var a = new Uint8Array(d.arrayFromInt32(8 * r.length))
          , c = new Uint8Array(8);
        c.set(a, 4);
        var u = d.arrayBufferConcat(r, n, i, c);
        return o.crypto.subtle.sign(e.auth.id, t, u).then(function(t) {
          return t.slice(0, e.auth.truncated_bytes)
        })
      })
    }
      , l = function(e) {
      switch (e) {
      case "RS256":
        return {
          jwa_name: "RS256",
          id: {
            name: "RSASSA-PKCS1-v1_5",
            hash: {
              name: "SHA-256"
            }
          }
        };
      case "RS384":
        return {
          jwa_name: "RS384",
          id: {
            name: "RSASSA-PKCS1-v1_5",
            hash: {
              name: "SHA-384"
            }
          }
        };
      case "RS512":
        return {
          jwa_name: "RS512",
          id: {
            name: "RSASSA-PKCS1-v1_5",
            hash: {
              name: "SHA-512"
            }
          }
        };
      case "PS256":
        return {
          jwa_name: "PS256",
          id: {
            name: "RSA-PSS",
            hash: {
              name: "SHA-256"
            },
            saltLength: 20
          }
        };
      case "PS384":
        return {
          jwa_name: "PS384",
          id: {
            name: "RSA-PSS",
            hash: {
              name: "SHA-384"
            },
            saltLength: 20
          }
        };
      case "PS512":
        return {
          jwa_name: "PS512",
          id: {
            name: "RSA-PSS",
            hash: {
              name: "SHA-512"
            },
            saltLength: 20
          }
        };
      case "HS256":
        return {
          jwa_name: "HS256",
          id: {
            name: "HMAC",
            hash: {
              name: "SHA-256"
            }
          }
        };
      case "HS384":
        return {
          jwa_name: "HS384",
          id: {
            name: "HMAC",
            hash: {
              name: "SHA-384"
            }
          }
        };
      case "HS512":
        return {
          jwa_name: "HS512",
          id: {
            name: "HMAC",
            hash: {
              name: "SHA-512"
            }
          }
        };
      case "ES256":
        return {
          jwa_name: "ES256",
          id: {
            name: "ECDSA",
            hash: {
              name: "SHA-256"
            }
          }
        };
      case "ES384":
        return {
          jwa_name: "ES384",
          id: {
            name: "ECDSA",
            hash: {
              name: "SHA-384"
            }
          }
        };
      case "ES512":
        return {
          jwa_name: "ES512",
          id: {
            name: "ECDSA",
            hash: {
              name: "SHA-512"
            }
          }
        };
      default:
        throw Error("unsupported algorithm: " + e)
      }
    }
      , p = function(e) {
      var t = ""
        , r = e.algorithm.name
        , n = e.algorithm.hash.name;
      if ("RSASSA-PKCS1-v1_5" == r)
        t = "R";
      else {
        if ("RSA-PSS" != r)
          throw new Error("unsupported sign/verify algorithm " + r);
        t = "P"
      }
      if (0 !== n.indexOf("SHA-"))
        throw new Error("unsupported hash algorithm " + r);
      return t += "S",
      t += n.substring(4)
    }
      , h = function(e) {
      switch (e) {
      case "RS256":
      case "RS384":
      case "RS512":
      case "PS256":
      case "PS384":
      case "PS512":
      case "HS256":
      case "HS384":
      case "HS512":
      case "ES256":
      case "ES384":
      case "ES512":
        return {
          publicKey: "verify",
          privateKey: "sign"
        };
      case "RSA-OAEP":
      case "RSA-OAEP-256":
      case "A128KW":
      case "A256KW":
        return {
          publicKey: "wrapKey",
          privateKey: "unwrapKey"
        };
      default:
        throw Error("unsupported algorithm: " + e)
      }
    };
    e.exports = a,
    o.Utils = {};
    var d = {};
    o.Utils.importRsaPublicKey = function(e, t) {
      var r, n, i = h(t);
      if ("wrapKey" == i.publicKey)
        e.alg || (e.alg = t),
        r = d.convertRsaKey(e, ["n", "e"]),
        n = s(t);
      else {
        var a = {};
        for (var c in e)
          e.hasOwnProperty(c) && (a[c] = e[c]);
        !a.alg && t && (a.alg = t),
        n = l(a.alg),
        (r = d.convertRsaKey(a, ["n", "e"])).ext = !0
      }
      return o.crypto.subtle.importKey("jwk", r, n.id, !1, [i.publicKey])
    }
    ,
    o.Utils.importRsaPrivateKey = function(e, t) {
      var r, n, i = h(t);
      if ("unwrapKey" == i.privateKey)
        e.alg || (e.alg = t),
        r = d.convertRsaKey(e, ["n", "e", "d", "p", "q", "dp", "dq", "qi"]),
        n = s(t);
      else {
        var a = {};
        for (var c in e)
          e.hasOwnProperty(c) && (a[c] = e[c]);
        n = l(t),
        !a.alg && t && (a.alg = t),
        (r = d.convertRsaKey(a, ["n", "e", "d", "p", "q", "dp", "dq", "qi"])).ext = !0
      }
      return o.crypto.subtle.importKey("jwk", r, n.id, !1, [i.privateKey])
    }
    ,
    d.isString = function(e) {
      return "string" == typeof e || e instanceof String
    }
    ,
    d.arrayish = function(e) {
      return e instanceof Array ? e : e instanceof Uint8Array ? e : e instanceof ArrayBuffer ? new Uint8Array(e) : void o.assert(!1, "arrayish: invalid input")
    }
    ,
    d.convertRsaKey = function(e, t) {
      var r, n = {}, i = [];
      t.map(function(t) {
        void 0 === e[t] && i.push(t)
      }),
      i.length > 0 && o.assert(!1, "convertRsaKey: Was expecting " + i.join()),
      void 0 !== e.kty && o.assert("RSA" == e.kty, "convertRsaKey: expecting rsa_key['kty'] to be 'RSA'"),
      n.kty = "RSA";
      try {
        l(e.alg),
        r = e.alg
      } catch (t) {
        try {
          s(e.alg),
          r = e.alg
        } catch (e) {
          o.assert(r, "convertRsaKey: expecting rsa_key['alg'] to have a valid value")
        }
      }
      n.alg = r;
      for (var a = function(e) {
        return parseInt(e, 16)
      }, c = 0; c < t.length; c++) {
        var u = t[c]
          , f = e[u];
        if ("e" == u)
          "number" == typeof f && (f = d.Base64Url.encodeArray(d.stripLeadingZeros(d.arrayFromInt32(f))));
        else if (/^([0-9a-fA-F]{2}:)+[0-9a-fA-F]{2}$/.test(f)) {
          var p = f.split(":").map(a);
          f = d.Base64Url.encodeArray(d.stripLeadingZeros(p))
        } else
          "string" != typeof f && o.assert(!1, "convertRsaKey: expecting rsa_key['" + u + "'] to be a string");
        n[u] = f
      }
      return n
    }
    ,
    d.arrayFromString = function(e) {
      o.assert(d.isString(e), "arrayFromString: invalid input");
      var t = e.split("").map(function(e) {
        return e.charCodeAt(0)
      });
      return new Uint8Array(t)
    }
    ,
    d.arrayFromUtf8String = function(e) {
      return o.assert(d.isString(e), "arrayFromUtf8String: invalid input"),
      e = unescape(encodeURIComponent(e)),
      d.arrayFromString(e)
    }
    ,
    d.stringFromArray = function(e) {
      e = d.arrayish(e);
      for (var t = "", r = 0; r < e.length; r++)
        t += String.fromCharCode(e[r]);
      return t
    }
    ,
    d.utf8StringFromArray = function(e) {
      o.assert(e instanceof ArrayBuffer, "utf8StringFromArray: invalid input");
      var t = d.stringFromArray(e);
      return decodeURIComponent(escape(t))
    }
    ,
    d.stripLeadingZeros = function(e) {
      e instanceof ArrayBuffer && (e = new Uint8Array(e));
      for (var t = !0, r = [], n = 0; n < e.length; n++)
        t && 0 === e[n] || (t = !1,
        r.push(e[n]));
      return r
    }
    ,
    d.arrayFromInt32 = function(e) {
      o.assert("number" == typeof e, "arrayFromInt32: invalid input"),
      o.assert(e == e | 0, "arrayFromInt32: out of range");
      for (var t = new Uint8Array(new Uint32Array([e]).buffer), r = new Uint8Array(4), n = 0; n < 4; n++)
        r[n] = t[3 - n];
      return r.buffer
    }
    ,
    d.arrayBufferConcat = function() {
      for (var e = [], t = 0, r = 0; r < arguments.length; r++)
        e.push(d.arrayish(arguments[r])),
        t += e[r].length;
      var n = new Uint8Array(t)
        , i = 0;
      for (r = 0; r < arguments.length; r++)
        for (var a = 0; a < e[r].length; a++)
          n[i++] = e[r][a];
      return o.assert(i == t, "arrayBufferConcat: unexpected offset"),
      n
    }
    ,
    d.Base64Url = {},
    d.Base64Url.encode = function(e) {
      return o.assert(d.isString(e), "Base64Url.encode: invalid input"),
      btoa(e).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
    }
    ,
    d.Base64Url.encodeArray = function(e) {
      return d.Base64Url.encode(d.stringFromArray(e))
    }
    ,
    d.Base64Url.decode = function(e) {
      return o.assert(d.isString(e), "Base64Url.decode: invalid input"),
      atob(e.replace(/-/g, "+").replace(/_/g, "/"))
    }
    ,
    d.Base64Url.decodeArray = function(e) {
      return o.assert(d.isString(e), "Base64Url.decodeArray: invalid input"),
      d.arrayFromString(d.Base64Url.decode(e))
    }
    ,
    d.sha256 = function(e) {
      return o.crypto.subtle.digest({
        name: "SHA-256"
      }, d.arrayFromString(e)).then(function(e) {
        return d.Base64Url.encodeArray(e)
      })
    }
    ,
    d.isCryptoKey = function(e) {
      return "CryptoKey" == e.constructor.name || !!e.hasOwnProperty("algorithm")
    }
    ,
    e.exports = d,
    i.Encrypter = function(e, t) {
      this.cryptographer = e,
      this.key_promise = t,
      this.userHeaders = {}
    }
    ,
    i.Encrypter.prototype.addHeader = function(e, t) {
      this.userHeaders[e] = t
    }
    ,
    i.Encrypter.prototype.getHeader = function(e) {
      return this.userHeaders[e]
    }
    ,
    i.Encrypter.prototype.encrypt = function(e) {
      var t, r;
      "dir" == this.cryptographer.getKeyEncryptionAlgorithm() ? (t = Promise.resolve(this.key_promise),
      r = []) : (t = this.cryptographer.createCek(),
      r = Promise.all([this.key_promise, t]).then(function(e) {
        var t = e[0]
          , r = e[1];
        return this.cryptographer.wrapCek(r, t)
      }
      .bind(this)));
      var n = function(e, t) {
        var r = {};
        for (var n in this.userHeaders)
          r[n] = this.userHeaders[n];
        r.alg = this.cryptographer.getKeyEncryptionAlgorithm(),
        r.enc = this.cryptographer.getContentEncryptionAlgorithm();
        var o = d.Base64Url.encode(JSON.stringify(r))
          , i = this.cryptographer.createIV()
          , a = d.arrayFromString(o);
        return t = d.arrayFromUtf8String(t),
        this.cryptographer.encrypt(i, a, e, t).then(function(e) {
          return e.header = o,
          e.iv = i,
          e
        })
      }
      .bind(this, t, e)();
      return Promise.all([r, n]).then(function(e) {
        var t = e[0]
          , r = e[1];
        return r.header + "." + d.Base64Url.encodeArray(t) + "." + d.Base64Url.encodeArray(r.iv) + "." + d.Base64Url.encodeArray(r.cipher) + "." + d.Base64Url.encodeArray(r.tag)
      })
    }
    ;
    var y = function(e, t, r, n) {
      r = r || "RSA-OAEP-256",
      n && o.setCrypto(n);
      var a = new o.WebCryptographer;
      a.setKeyEncryptionAlgorithm(r),
      a.setContentEncryptionAlgorithm("A256GCM");
      var c = o.Utils.importRsaPublicKey(t, r)
        , u = new i.Encrypter(a,c);
      if (u.addHeader("kid", e),
      u.addHeader("typ", "JOSE"),
      u.addHeader("iat", (new Date).getTime()),
      this.encrypter = u,
      i.Decrypter) {
        var s = o.Utils.importRsaPrivateKey(t, r)
          , f = new i.Decrypter(a,s);
        this.decrypter = f,
        this.decrypt = function(e) {
          return this.decrypter.decrypt(e)
        }
      }
      this.sanityCheck = function() {
        return o.caniuse()
      }
      ,
      this.encrypt = function(e) {
        return this.encrypter.encrypt(e)
      }
    };
    e.exports.PANJWE = y,
    t.PANJWE = y
  }
  ).call(this, r(4).Buffer)
}
, function(e, t) {
  var r;
  r = function() {
    return this
  }();
  try {
    r = r || new Function("return this")()
  } catch (e) {
    "object" == typeof window && (r = window)
  }
  e.exports = r
}
, function(e, t, r) {
  r(3)({
    presets: ["env"]
  }),
  e.exports = r(13)
}
, function(e, t, r) {
  "use strict";
  t.__esModule = !0,
  t.default = function() {}
  ,
  e.exports = t.default
}
, function(e, t, r) {
  "use strict";
  (function(e) {
    /*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
    var n = r(5)
      , o = r(6)
      , i = r(7);
    function a() {
      return u.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
    }
    function c(e, t) {
      if (a() < t)
        throw new RangeError("Invalid typed array length");
      return u.TYPED_ARRAY_SUPPORT ? (e = new Uint8Array(t)).__proto__ = u.prototype : (null === e && (e = new u(t)),
      e.length = t),
      e
    }
    function u(e, t, r) {
      if (!(u.TYPED_ARRAY_SUPPORT || this instanceof u))
        return new u(e,t,r);
      if ("number" == typeof e) {
        if ("string" == typeof t)
          throw new Error("If encoding is specified then the first argument must be a string");
        return l(this, e)
      }
      return s(this, e, t, r)
    }
    function s(e, t, r, n) {
      if ("number" == typeof t)
        throw new TypeError('"value" argument must not be a number');
      return "undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer ? function(e, t, r, n) {
        if (t.byteLength,
        r < 0 || t.byteLength < r)
          throw new RangeError("'offset' is out of bounds");
        if (t.byteLength < r + (n || 0))
          throw new RangeError("'length' is out of bounds");
        t = void 0 === r && void 0 === n ? new Uint8Array(t) : void 0 === n ? new Uint8Array(t,r) : new Uint8Array(t,r,n);
        u.TYPED_ARRAY_SUPPORT ? (e = t).__proto__ = u.prototype : e = p(e, t);
        return e
      }(e, t, r, n) : "string" == typeof t ? function(e, t, r) {
        "string" == typeof r && "" !== r || (r = "utf8");
        if (!u.isEncoding(r))
          throw new TypeError('"encoding" must be a valid string encoding');
        var n = 0 | d(t, r)
          , o = (e = c(e, n)).write(t, r);
        o !== n && (e = e.slice(0, o));
        return e
      }(e, t, r) : function(e, t) {
        if (u.isBuffer(t)) {
          var r = 0 | h(t.length);
          return 0 === (e = c(e, r)).length ? e : (t.copy(e, 0, 0, r),
          e)
        }
        if (t) {
          if ("undefined" != typeof ArrayBuffer && t.buffer instanceof ArrayBuffer || "length"in t)
            return "number" != typeof t.length || (n = t.length) != n ? c(e, 0) : p(e, t);
          if ("Buffer" === t.type && i(t.data))
            return p(e, t.data)
        }
        var n;
        throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")
      }(e, t)
    }
    function f(e) {
      if ("number" != typeof e)
        throw new TypeError('"size" argument must be a number');
      if (e < 0)
        throw new RangeError('"size" argument must not be negative')
    }
    function l(e, t) {
      if (f(t),
      e = c(e, t < 0 ? 0 : 0 | h(t)),
      !u.TYPED_ARRAY_SUPPORT)
        for (var r = 0; r < t; ++r)
          e[r] = 0;
      return e
    }
    function p(e, t) {
      var r = t.length < 0 ? 0 : 0 | h(t.length);
      e = c(e, r);
      for (var n = 0; n < r; n += 1)
        e[n] = 255 & t[n];
      return e
    }
    function h(e) {
      if (e >= a())
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + a().toString(16) + " bytes");
      return 0 | e
    }
    function d(e, t) {
      if (u.isBuffer(e))
        return e.length;
      if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(e) || e instanceof ArrayBuffer))
        return e.byteLength;
      "string" != typeof e && (e = "" + e);
      var r = e.length;
      if (0 === r)
        return 0;
      for (var n = !1; ; )
        switch (t) {
        case "ascii":
        case "latin1":
        case "binary":
          return r;
        case "utf8":
        case "utf-8":
        case void 0:
          return L(e).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return 2 * r;
        case "hex":
          return r >>> 1;
        case "base64":
          return D(e).length;
        default:
          if (n)
            return L(e).length;
          t = ("" + t).toLowerCase(),
          n = !0
        }
    }
    function y(e, t, r) {
      var n = e[t];
      e[t] = e[r],
      e[r] = n
    }
    function g(e, t, r, n, o) {
      if (0 === e.length)
        return -1;
      if ("string" == typeof r ? (n = r,
      r = 0) : r > 2147483647 ? r = 2147483647 : r < -2147483648 && (r = -2147483648),
      r = +r,
      isNaN(r) && (r = o ? 0 : e.length - 1),
      r < 0 && (r = e.length + r),
      r >= e.length) {
        if (o)
          return -1;
        r = e.length - 1
      } else if (r < 0) {
        if (!o)
          return -1;
        r = 0
      }
      if ("string" == typeof t && (t = u.from(t, n)),
      u.isBuffer(t))
        return 0 === t.length ? -1 : b(e, t, r, n, o);
      if ("number" == typeof t)
        return t &= 255,
        u.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? o ? Uint8Array.prototype.indexOf.call(e, t, r) : Uint8Array.prototype.lastIndexOf.call(e, t, r) : b(e, [t], r, n, o);
      throw new TypeError("val must be string, number or Buffer")
    }
    function b(e, t, r, n, o) {
      var i, a = 1, c = e.length, u = t.length;
      if (void 0 !== n && ("ucs2" === (n = String(n).toLowerCase()) || "ucs-2" === n || "utf16le" === n || "utf-16le" === n)) {
        if (e.length < 2 || t.length < 2)
          return -1;
        a = 2,
        c /= 2,
        u /= 2,
        r /= 2
      }
      function s(e, t) {
        return 1 === a ? e[t] : e.readUInt16BE(t * a)
      }
      if (o) {
        var f = -1;
        for (i = r; i < c; i++)
          if (s(e, i) === s(t, -1 === f ? 0 : i - f)) {
            if (-1 === f && (f = i),
            i - f + 1 === u)
              return f * a
          } else
            -1 !== f && (i -= i - f),
            f = -1
      } else
        for (r + u > c && (r = c - u),
        i = r; i >= 0; i--) {
          for (var l = !0, p = 0; p < u; p++)
            if (s(e, i + p) !== s(t, p)) {
              l = !1;
              break
            }
          if (l)
            return i
        }
      return -1
    }
    function m(e, t, r, n) {
      r = Number(r) || 0;
      var o = e.length - r;
      n ? (n = Number(n)) > o && (n = o) : n = o;
      var i = t.length;
      if (i % 2 != 0)
        throw new TypeError("Invalid hex string");
      n > i / 2 && (n = i / 2);
      for (var a = 0; a < n; ++a) {
        var c = parseInt(t.substr(2 * a, 2), 16);
        if (isNaN(c))
          return a;
        e[r + a] = c
      }
      return a
    }
    function v(e, t, r, n) {
      return J(L(t, e.length - r), e, r, n)
    }
    function A(e, t, r, n) {
      return J(function(e) {
        for (var t = [], r = 0; r < e.length; ++r)
          t.push(255 & e.charCodeAt(r));
        return t
      }(t), e, r, n)
    }
    function w(e, t, r, n) {
      return A(e, t, r, n)
    }
    function S(e, t, r, n) {
      return J(D(t), e, r, n)
    }
    function E(e, t, r, n) {
      return J(function(e, t) {
        for (var r, n, o, i = [], a = 0; a < e.length && !((t -= 2) < 0); ++a)
          r = e.charCodeAt(a),
          n = r >> 8,
          o = r % 256,
          i.push(o),
          i.push(n);
        return i
      }(t, e.length - r), e, r, n)
    }
    function _(e, t, r) {
      return 0 === t && r === e.length ? n.fromByteArray(e) : n.fromByteArray(e.slice(t, r))
    }
    function P(e, t, r) {
      r = Math.min(e.length, r);
      for (var n = [], o = t; o < r; ) {
        var i, a, c, u, s = e[o], f = null, l = s > 239 ? 4 : s > 223 ? 3 : s > 191 ? 2 : 1;
        if (o + l <= r)
          switch (l) {
          case 1:
            s < 128 && (f = s);
            break;
          case 2:
            128 == (192 & (i = e[o + 1])) && (u = (31 & s) << 6 | 63 & i) > 127 && (f = u);
            break;
          case 3:
            i = e[o + 1],
            a = e[o + 2],
            128 == (192 & i) && 128 == (192 & a) && (u = (15 & s) << 12 | (63 & i) << 6 | 63 & a) > 2047 && (u < 55296 || u > 57343) && (f = u);
            break;
          case 4:
            i = e[o + 1],
            a = e[o + 2],
            c = e[o + 3],
            128 == (192 & i) && 128 == (192 & a) && 128 == (192 & c) && (u = (15 & s) << 18 | (63 & i) << 12 | (63 & a) << 6 | 63 & c) > 65535 && u < 1114112 && (f = u)
          }
        null === f ? (f = 65533,
        l = 1) : f > 65535 && (f -= 65536,
        n.push(f >>> 10 & 1023 | 55296),
        f = 56320 | 1023 & f),
        n.push(f),
        o += l
      }
      return function(e) {
        var t = e.length;
        if (t <= C)
          return String.fromCharCode.apply(String, e);
        var r = ""
          , n = 0;
        for (; n < t; )
          r += String.fromCharCode.apply(String, e.slice(n, n += C));
        return r
      }(n)
    }
    t.Buffer = u,
    t.SlowBuffer = function(e) {
      +e != e && (e = 0);
      return u.alloc(+e)
    }
    ,
    t.INSPECT_MAX_BYTES = 50,
    u.TYPED_ARRAY_SUPPORT = void 0 !== e.TYPED_ARRAY_SUPPORT ? e.TYPED_ARRAY_SUPPORT : function() {
      try {
        var e = new Uint8Array(1);
        return e.__proto__ = {
          __proto__: Uint8Array.prototype,
          foo: function() {
            return 42
          }
        },
        42 === e.foo() && "function" == typeof e.subarray && 0 === e.subarray(1, 1).byteLength
      } catch (e) {
        return !1
      }
    }(),
    t.kMaxLength = a(),
    u.poolSize = 8192,
    u._augment = function(e) {
      return e.__proto__ = u.prototype,
      e
    }
    ,
    u.from = function(e, t, r) {
      return s(null, e, t, r)
    }
    ,
    u.TYPED_ARRAY_SUPPORT && (u.prototype.__proto__ = Uint8Array.prototype,
    u.__proto__ = Uint8Array,
    "undefined" != typeof Symbol && Symbol.species && u[Symbol.species] === u && Object.defineProperty(u, Symbol.species, {
      value: null,
      configurable: !0
    })),
    u.alloc = function(e, t, r) {
      return function(e, t, r, n) {
        return f(t),
        t <= 0 ? c(e, t) : void 0 !== r ? "string" == typeof n ? c(e, t).fill(r, n) : c(e, t).fill(r) : c(e, t)
      }(null, e, t, r)
    }
    ,
    u.allocUnsafe = function(e) {
      return l(null, e)
    }
    ,
    u.allocUnsafeSlow = function(e) {
      return l(null, e)
    }
    ,
    u.isBuffer = function(e) {
      return !(null == e || !e._isBuffer)
    }
    ,
    u.compare = function(e, t) {
      if (!u.isBuffer(e) || !u.isBuffer(t))
        throw new TypeError("Arguments must be Buffers");
      if (e === t)
        return 0;
      for (var r = e.length, n = t.length, o = 0, i = Math.min(r, n); o < i; ++o)
        if (e[o] !== t[o]) {
          r = e[o],
          n = t[o];
          break
        }
      return r < n ? -1 : n < r ? 1 : 0
    }
    ,
    u.isEncoding = function(e) {
      switch (String(e).toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "latin1":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return !0;
      default:
        return !1
      }
    }
    ,
    u.concat = function(e, t) {
      if (!i(e))
        throw new TypeError('"list" argument must be an Array of Buffers');
      if (0 === e.length)
        return u.alloc(0);
      var r;
      if (void 0 === t)
        for (t = 0,
        r = 0; r < e.length; ++r)
          t += e[r].length;
      var n = u.allocUnsafe(t)
        , o = 0;
      for (r = 0; r < e.length; ++r) {
        var a = e[r];
        if (!u.isBuffer(a))
          throw new TypeError('"list" argument must be an Array of Buffers');
        a.copy(n, o),
        o += a.length
      }
      return n
    }
    ,
    u.byteLength = d,
    u.prototype._isBuffer = !0,
    u.prototype.swap16 = function() {
      var e = this.length;
      if (e % 2 != 0)
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      for (var t = 0; t < e; t += 2)
        y(this, t, t + 1);
      return this
    }
    ,
    u.prototype.swap32 = function() {
      var e = this.length;
      if (e % 4 != 0)
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      for (var t = 0; t < e; t += 4)
        y(this, t, t + 3),
        y(this, t + 1, t + 2);
      return this
    }
    ,
    u.prototype.swap64 = function() {
      var e = this.length;
      if (e % 8 != 0)
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      for (var t = 0; t < e; t += 8)
        y(this, t, t + 7),
        y(this, t + 1, t + 6),
        y(this, t + 2, t + 5),
        y(this, t + 3, t + 4);
      return this
    }
    ,
    u.prototype.toString = function() {
      var e = 0 | this.length;
      return 0 === e ? "" : 0 === arguments.length ? P(this, 0, e) : function(e, t, r) {
        var n = !1;
        if ((void 0 === t || t < 0) && (t = 0),
        t > this.length)
          return "";
        if ((void 0 === r || r > this.length) && (r = this.length),
        r <= 0)
          return "";
        if ((r >>>= 0) <= (t >>>= 0))
          return "";
        for (e || (e = "utf8"); ; )
          switch (e) {
          case "hex":
            return k(this, t, r);
          case "utf8":
          case "utf-8":
            return P(this, t, r);
          case "ascii":
            return I(this, t, r);
          case "latin1":
          case "binary":
            return R(this, t, r);
          case "base64":
            return _(this, t, r);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return B(this, t, r);
          default:
            if (n)
              throw new TypeError("Unknown encoding: " + e);
            e = (e + "").toLowerCase(),
            n = !0
          }
      }
      .apply(this, arguments)
    }
    ,
    u.prototype.equals = function(e) {
      if (!u.isBuffer(e))
        throw new TypeError("Argument must be a Buffer");
      return this === e || 0 === u.compare(this, e)
    }
    ,
    u.prototype.inspect = function() {
      var e = ""
        , r = t.INSPECT_MAX_BYTES;
      return this.length > 0 && (e = this.toString("hex", 0, r).match(/.{2}/g).join(" "),
      this.length > r && (e += " ... ")),
      "<Buffer " + e + ">"
    }
    ,
    u.prototype.compare = function(e, t, r, n, o) {
      if (!u.isBuffer(e))
        throw new TypeError("Argument must be a Buffer");
      if (void 0 === t && (t = 0),
      void 0 === r && (r = e ? e.length : 0),
      void 0 === n && (n = 0),
      void 0 === o && (o = this.length),
      t < 0 || r > e.length || n < 0 || o > this.length)
        throw new RangeError("out of range index");
      if (n >= o && t >= r)
        return 0;
      if (n >= o)
        return -1;
      if (t >= r)
        return 1;
      if (this === e)
        return 0;
      for (var i = (o >>>= 0) - (n >>>= 0), a = (r >>>= 0) - (t >>>= 0), c = Math.min(i, a), s = this.slice(n, o), f = e.slice(t, r), l = 0; l < c; ++l)
        if (s[l] !== f[l]) {
          i = s[l],
          a = f[l];
          break
        }
      return i < a ? -1 : a < i ? 1 : 0
    }
    ,
    u.prototype.includes = function(e, t, r) {
      return -1 !== this.indexOf(e, t, r)
    }
    ,
    u.prototype.indexOf = function(e, t, r) {
      return g(this, e, t, r, !0)
    }
    ,
    u.prototype.lastIndexOf = function(e, t, r) {
      return g(this, e, t, r, !1)
    }
    ,
    u.prototype.write = function(e, t, r, n) {
      if (void 0 === t)
        n = "utf8",
        r = this.length,
        t = 0;
      else if (void 0 === r && "string" == typeof t)
        n = t,
        r = this.length,
        t = 0;
      else {
        if (!isFinite(t))
          throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
        t |= 0,
        isFinite(r) ? (r |= 0,
        void 0 === n && (n = "utf8")) : (n = r,
        r = void 0)
      }
      var o = this.length - t;
      if ((void 0 === r || r > o) && (r = o),
      e.length > 0 && (r < 0 || t < 0) || t > this.length)
        throw new RangeError("Attempt to write outside buffer bounds");
      n || (n = "utf8");
      for (var i = !1; ; )
        switch (n) {
        case "hex":
          return m(this, e, t, r);
        case "utf8":
        case "utf-8":
          return v(this, e, t, r);
        case "ascii":
          return A(this, e, t, r);
        case "latin1":
        case "binary":
          return w(this, e, t, r);
        case "base64":
          return S(this, e, t, r);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return E(this, e, t, r);
        default:
          if (i)
            throw new TypeError("Unknown encoding: " + n);
          n = ("" + n).toLowerCase(),
          i = !0
        }
    }
    ,
    u.prototype.toJSON = function() {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      }
    }
    ;
    var C = 4096;
    function I(e, t, r) {
      var n = "";
      r = Math.min(e.length, r);
      for (var o = t; o < r; ++o)
        n += String.fromCharCode(127 & e[o]);
      return n
    }
    function R(e, t, r) {
      var n = "";
      r = Math.min(e.length, r);
      for (var o = t; o < r; ++o)
        n += String.fromCharCode(e[o]);
      return n
    }
    function k(e, t, r) {
      var n = e.length;
      (!t || t < 0) && (t = 0),
      (!r || r < 0 || r > n) && (r = n);
      for (var o = "", i = t; i < r; ++i)
        o += H(e[i]);
      return o
    }
    function B(e, t, r) {
      for (var n = e.slice(t, r), o = "", i = 0; i < n.length; i += 2)
        o += String.fromCharCode(n[i] + 256 * n[i + 1]);
      return o
    }
    function U(e, t, r) {
      if (e % 1 != 0 || e < 0)
        throw new RangeError("offset is not uint");
      if (e + t > r)
        throw new RangeError("Trying to access beyond buffer length")
    }
    function K(e, t, r, n, o, i) {
      if (!u.isBuffer(e))
        throw new TypeError('"buffer" argument must be a Buffer instance');
      if (t > o || t < i)
        throw new RangeError('"value" argument is out of bounds');
      if (r + n > e.length)
        throw new RangeError("Index out of range")
    }
    function T(e, t, r, n) {
      t < 0 && (t = 65535 + t + 1);
      for (var o = 0, i = Math.min(e.length - r, 2); o < i; ++o)
        e[r + o] = (t & 255 << 8 * (n ? o : 1 - o)) >>> 8 * (n ? o : 1 - o)
    }
    function O(e, t, r, n) {
      t < 0 && (t = 4294967295 + t + 1);
      for (var o = 0, i = Math.min(e.length - r, 4); o < i; ++o)
        e[r + o] = t >>> 8 * (n ? o : 3 - o) & 255
    }
    function N(e, t, r, n, o, i) {
      if (r + n > e.length)
        throw new RangeError("Index out of range");
      if (r < 0)
        throw new RangeError("Index out of range")
    }
    function x(e, t, r, n, i) {
      return i || N(e, 0, r, 4),
      o.write(e, t, r, n, 23, 4),
      r + 4
    }
    function M(e, t, r, n, i) {
      return i || N(e, 0, r, 8),
      o.write(e, t, r, n, 52, 8),
      r + 8
    }
    u.prototype.slice = function(e, t) {
      var r, n = this.length;
      if ((e = ~~e) < 0 ? (e += n) < 0 && (e = 0) : e > n && (e = n),
      (t = void 0 === t ? n : ~~t) < 0 ? (t += n) < 0 && (t = 0) : t > n && (t = n),
      t < e && (t = e),
      u.TYPED_ARRAY_SUPPORT)
        (r = this.subarray(e, t)).__proto__ = u.prototype;
      else {
        var o = t - e;
        r = new u(o,void 0);
        for (var i = 0; i < o; ++i)
          r[i] = this[i + e]
      }
      return r
    }
    ,
    u.prototype.readUIntLE = function(e, t, r) {
      e |= 0,
      t |= 0,
      r || U(e, t, this.length);
      for (var n = this[e], o = 1, i = 0; ++i < t && (o *= 256); )
        n += this[e + i] * o;
      return n
    }
    ,
    u.prototype.readUIntBE = function(e, t, r) {
      e |= 0,
      t |= 0,
      r || U(e, t, this.length);
      for (var n = this[e + --t], o = 1; t > 0 && (o *= 256); )
        n += this[e + --t] * o;
      return n
    }
    ,
    u.prototype.readUInt8 = function(e, t) {
      return t || U(e, 1, this.length),
      this[e]
    }
    ,
    u.prototype.readUInt16LE = function(e, t) {
      return t || U(e, 2, this.length),
      this[e] | this[e + 1] << 8
    }
    ,
    u.prototype.readUInt16BE = function(e, t) {
      return t || U(e, 2, this.length),
      this[e] << 8 | this[e + 1]
    }
    ,
    u.prototype.readUInt32LE = function(e, t) {
      return t || U(e, 4, this.length),
      (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3]
    }
    ,
    u.prototype.readUInt32BE = function(e, t) {
      return t || U(e, 4, this.length),
      16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3])
    }
    ,
    u.prototype.readIntLE = function(e, t, r) {
      e |= 0,
      t |= 0,
      r || U(e, t, this.length);
      for (var n = this[e], o = 1, i = 0; ++i < t && (o *= 256); )
        n += this[e + i] * o;
      return n >= (o *= 128) && (n -= Math.pow(2, 8 * t)),
      n
    }
    ,
    u.prototype.readIntBE = function(e, t, r) {
      e |= 0,
      t |= 0,
      r || U(e, t, this.length);
      for (var n = t, o = 1, i = this[e + --n]; n > 0 && (o *= 256); )
        i += this[e + --n] * o;
      return i >= (o *= 128) && (i -= Math.pow(2, 8 * t)),
      i
    }
    ,
    u.prototype.readInt8 = function(e, t) {
      return t || U(e, 1, this.length),
      128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
    }
    ,
    u.prototype.readInt16LE = function(e, t) {
      t || U(e, 2, this.length);
      var r = this[e] | this[e + 1] << 8;
      return 32768 & r ? 4294901760 | r : r
    }
    ,
    u.prototype.readInt16BE = function(e, t) {
      t || U(e, 2, this.length);
      var r = this[e + 1] | this[e] << 8;
      return 32768 & r ? 4294901760 | r : r
    }
    ,
    u.prototype.readInt32LE = function(e, t) {
      return t || U(e, 4, this.length),
      this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24
    }
    ,
    u.prototype.readInt32BE = function(e, t) {
      return t || U(e, 4, this.length),
      this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]
    }
    ,
    u.prototype.readFloatLE = function(e, t) {
      return t || U(e, 4, this.length),
      o.read(this, e, !0, 23, 4)
    }
    ,
    u.prototype.readFloatBE = function(e, t) {
      return t || U(e, 4, this.length),
      o.read(this, e, !1, 23, 4)
    }
    ,
    u.prototype.readDoubleLE = function(e, t) {
      return t || U(e, 8, this.length),
      o.read(this, e, !0, 52, 8)
    }
    ,
    u.prototype.readDoubleBE = function(e, t) {
      return t || U(e, 8, this.length),
      o.read(this, e, !1, 52, 8)
    }
    ,
    u.prototype.writeUIntLE = function(e, t, r, n) {
      (e = +e,
      t |= 0,
      r |= 0,
      n) || K(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
      var o = 1
        , i = 0;
      for (this[t] = 255 & e; ++i < r && (o *= 256); )
        this[t + i] = e / o & 255;
      return t + r
    }
    ,
    u.prototype.writeUIntBE = function(e, t, r, n) {
      (e = +e,
      t |= 0,
      r |= 0,
      n) || K(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
      var o = r - 1
        , i = 1;
      for (this[t + o] = 255 & e; --o >= 0 && (i *= 256); )
        this[t + o] = e / i & 255;
      return t + r
    }
    ,
    u.prototype.writeUInt8 = function(e, t, r) {
      return e = +e,
      t |= 0,
      r || K(this, e, t, 1, 255, 0),
      u.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)),
      this[t] = 255 & e,
      t + 1
    }
    ,
    u.prototype.writeUInt16LE = function(e, t, r) {
      return e = +e,
      t |= 0,
      r || K(this, e, t, 2, 65535, 0),
      u.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e,
      this[t + 1] = e >>> 8) : T(this, e, t, !0),
      t + 2
    }
    ,
    u.prototype.writeUInt16BE = function(e, t, r) {
      return e = +e,
      t |= 0,
      r || K(this, e, t, 2, 65535, 0),
      u.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8,
      this[t + 1] = 255 & e) : T(this, e, t, !1),
      t + 2
    }
    ,
    u.prototype.writeUInt32LE = function(e, t, r) {
      return e = +e,
      t |= 0,
      r || K(this, e, t, 4, 4294967295, 0),
      u.TYPED_ARRAY_SUPPORT ? (this[t + 3] = e >>> 24,
      this[t + 2] = e >>> 16,
      this[t + 1] = e >>> 8,
      this[t] = 255 & e) : O(this, e, t, !0),
      t + 4
    }
    ,
    u.prototype.writeUInt32BE = function(e, t, r) {
      return e = +e,
      t |= 0,
      r || K(this, e, t, 4, 4294967295, 0),
      u.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24,
      this[t + 1] = e >>> 16,
      this[t + 2] = e >>> 8,
      this[t + 3] = 255 & e) : O(this, e, t, !1),
      t + 4
    }
    ,
    u.prototype.writeIntLE = function(e, t, r, n) {
      if (e = +e,
      t |= 0,
      !n) {
        var o = Math.pow(2, 8 * r - 1);
        K(this, e, t, r, o - 1, -o)
      }
      var i = 0
        , a = 1
        , c = 0;
      for (this[t] = 255 & e; ++i < r && (a *= 256); )
        e < 0 && 0 === c && 0 !== this[t + i - 1] && (c = 1),
        this[t + i] = (e / a >> 0) - c & 255;
      return t + r
    }
    ,
    u.prototype.writeIntBE = function(e, t, r, n) {
      if (e = +e,
      t |= 0,
      !n) {
        var o = Math.pow(2, 8 * r - 1);
        K(this, e, t, r, o - 1, -o)
      }
      var i = r - 1
        , a = 1
        , c = 0;
      for (this[t + i] = 255 & e; --i >= 0 && (a *= 256); )
        e < 0 && 0 === c && 0 !== this[t + i + 1] && (c = 1),
        this[t + i] = (e / a >> 0) - c & 255;
      return t + r
    }
    ,
    u.prototype.writeInt8 = function(e, t, r) {
      return e = +e,
      t |= 0,
      r || K(this, e, t, 1, 127, -128),
      u.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)),
      e < 0 && (e = 255 + e + 1),
      this[t] = 255 & e,
      t + 1
    }
    ,
    u.prototype.writeInt16LE = function(e, t, r) {
      return e = +e,
      t |= 0,
      r || K(this, e, t, 2, 32767, -32768),
      u.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e,
      this[t + 1] = e >>> 8) : T(this, e, t, !0),
      t + 2
    }
    ,
    u.prototype.writeInt16BE = function(e, t, r) {
      return e = +e,
      t |= 0,
      r || K(this, e, t, 2, 32767, -32768),
      u.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8,
      this[t + 1] = 255 & e) : T(this, e, t, !1),
      t + 2
    }
    ,
    u.prototype.writeInt32LE = function(e, t, r) {
      return e = +e,
      t |= 0,
      r || K(this, e, t, 4, 2147483647, -2147483648),
      u.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e,
      this[t + 1] = e >>> 8,
      this[t + 2] = e >>> 16,
      this[t + 3] = e >>> 24) : O(this, e, t, !0),
      t + 4
    }
    ,
    u.prototype.writeInt32BE = function(e, t, r) {
      return e = +e,
      t |= 0,
      r || K(this, e, t, 4, 2147483647, -2147483648),
      e < 0 && (e = 4294967295 + e + 1),
      u.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24,
      this[t + 1] = e >>> 16,
      this[t + 2] = e >>> 8,
      this[t + 3] = 255 & e) : O(this, e, t, !1),
      t + 4
    }
    ,
    u.prototype.writeFloatLE = function(e, t, r) {
      return x(this, e, t, !0, r)
    }
    ,
    u.prototype.writeFloatBE = function(e, t, r) {
      return x(this, e, t, !1, r)
    }
    ,
    u.prototype.writeDoubleLE = function(e, t, r) {
      return M(this, e, t, !0, r)
    }
    ,
    u.prototype.writeDoubleBE = function(e, t, r) {
      return M(this, e, t, !1, r)
    }
    ,
    u.prototype.copy = function(e, t, r, n) {
      if (r || (r = 0),
      n || 0 === n || (n = this.length),
      t >= e.length && (t = e.length),
      t || (t = 0),
      n > 0 && n < r && (n = r),
      n === r)
        return 0;
      if (0 === e.length || 0 === this.length)
        return 0;
      if (t < 0)
        throw new RangeError("targetStart out of bounds");
      if (r < 0 || r >= this.length)
        throw new RangeError("sourceStart out of bounds");
      if (n < 0)
        throw new RangeError("sourceEnd out of bounds");
      n > this.length && (n = this.length),
      e.length - t < n - r && (n = e.length - t + r);
      var o, i = n - r;
      if (this === e && r < t && t < n)
        for (o = i - 1; o >= 0; --o)
          e[o + t] = this[o + r];
      else if (i < 1e3 || !u.TYPED_ARRAY_SUPPORT)
        for (o = 0; o < i; ++o)
          e[o + t] = this[o + r];
      else
        Uint8Array.prototype.set.call(e, this.subarray(r, r + i), t);
      return i
    }
    ,
    u.prototype.fill = function(e, t, r, n) {
      if ("string" == typeof e) {
        if ("string" == typeof t ? (n = t,
        t = 0,
        r = this.length) : "string" == typeof r && (n = r,
        r = this.length),
        1 === e.length) {
          var o = e.charCodeAt(0);
          o < 256 && (e = o)
        }
        if (void 0 !== n && "string" != typeof n)
          throw new TypeError("encoding must be a string");
        if ("string" == typeof n && !u.isEncoding(n))
          throw new TypeError("Unknown encoding: " + n)
      } else
        "number" == typeof e && (e &= 255);
      if (t < 0 || this.length < t || this.length < r)
        throw new RangeError("Out of range index");
      if (r <= t)
        return this;
      var i;
      if (t >>>= 0,
      r = void 0 === r ? this.length : r >>> 0,
      e || (e = 0),
      "number" == typeof e)
        for (i = t; i < r; ++i)
          this[i] = e;
      else {
        var a = u.isBuffer(e) ? e : L(new u(e,n).toString())
          , c = a.length;
        for (i = 0; i < r - t; ++i)
          this[i + t] = a[i % c]
      }
      return this
    }
    ;
    var j = /[^+\/0-9A-Za-z-_]/g;
    function H(e) {
      return e < 16 ? "0" + e.toString(16) : e.toString(16)
    }
    function L(e, t) {
      var r;
      t = t || 1 / 0;
      for (var n = e.length, o = null, i = [], a = 0; a < n; ++a) {
        if ((r = e.charCodeAt(a)) > 55295 && r < 57344) {
          if (!o) {
            if (r > 56319) {
              (t -= 3) > -1 && i.push(239, 191, 189);
              continue
            }
            if (a + 1 === n) {
              (t -= 3) > -1 && i.push(239, 191, 189);
              continue
            }
            o = r;
            continue
          }
          if (r < 56320) {
            (t -= 3) > -1 && i.push(239, 191, 189),
            o = r;
            continue
          }
          r = 65536 + (o - 55296 << 10 | r - 56320)
        } else
          o && (t -= 3) > -1 && i.push(239, 191, 189);
        if (o = null,
        r < 128) {
          if ((t -= 1) < 0)
            break;
          i.push(r)
        } else if (r < 2048) {
          if ((t -= 2) < 0)
            break;
          i.push(r >> 6 | 192, 63 & r | 128)
        } else if (r < 65536) {
          if ((t -= 3) < 0)
            break;
          i.push(r >> 12 | 224, r >> 6 & 63 | 128, 63 & r | 128)
        } else {
          if (!(r < 1114112))
            throw new Error("Invalid code point");
          if ((t -= 4) < 0)
            break;
          i.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, 63 & r | 128)
        }
      }
      return i
    }
    function D(e) {
      return n.toByteArray(function(e) {
        if ((e = function(e) {
          return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "")
        }(e).replace(j, "")).length < 2)
          return "";
        for (; e.length % 4 != 0; )
          e += "=";
        return e
      }(e))
    }
    function J(e, t, r, n) {
      for (var o = 0; o < n && !(o + r >= t.length || o >= e.length); ++o)
        t[o + r] = e[o];
      return o
    }
  }
  ).call(this, r(1))
}
, function(e, t, r) {
  "use strict";
  t.byteLength = function(e) {
    var t = s(e)
      , r = t[0]
      , n = t[1];
    return 3 * (r + n) / 4 - n
  }
  ,
  t.toByteArray = function(e) {
    for (var t, r = s(e), n = r[0], a = r[1], c = new i(function(e, t, r) {
      return 3 * (t + r) / 4 - r
    }(0, n, a)), u = 0, f = a > 0 ? n - 4 : n, l = 0; l < f; l += 4)
      t = o[e.charCodeAt(l)] << 18 | o[e.charCodeAt(l + 1)] << 12 | o[e.charCodeAt(l + 2)] << 6 | o[e.charCodeAt(l + 3)],
      c[u++] = t >> 16 & 255,
      c[u++] = t >> 8 & 255,
      c[u++] = 255 & t;
    2 === a && (t = o[e.charCodeAt(l)] << 2 | o[e.charCodeAt(l + 1)] >> 4,
    c[u++] = 255 & t);
    1 === a && (t = o[e.charCodeAt(l)] << 10 | o[e.charCodeAt(l + 1)] << 4 | o[e.charCodeAt(l + 2)] >> 2,
    c[u++] = t >> 8 & 255,
    c[u++] = 255 & t);
    return c
  }
  ,
  t.fromByteArray = function(e) {
    for (var t, r = e.length, o = r % 3, i = [], a = 0, c = r - o; a < c; a += 16383)
      i.push(f(e, a, a + 16383 > c ? c : a + 16383));
    1 === o ? (t = e[r - 1],
    i.push(n[t >> 2] + n[t << 4 & 63] + "==")) : 2 === o && (t = (e[r - 2] << 8) + e[r - 1],
    i.push(n[t >> 10] + n[t >> 4 & 63] + n[t << 2 & 63] + "="));
    return i.join("")
  }
  ;
  for (var n = [], o = [], i = "undefined" != typeof Uint8Array ? Uint8Array : Array, a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", c = 0, u = a.length; c < u; ++c)
    n[c] = a[c],
    o[a.charCodeAt(c)] = c;
  function s(e) {
    var t = e.length;
    if (t % 4 > 0)
      throw new Error("Invalid string. Length must be a multiple of 4");
    var r = e.indexOf("=");
    return -1 === r && (r = t),
    [r, r === t ? 0 : 4 - r % 4]
  }
  function f(e, t, r) {
    for (var o, i, a = [], c = t; c < r; c += 3)
      o = (e[c] << 16 & 16711680) + (e[c + 1] << 8 & 65280) + (255 & e[c + 2]),
      a.push(n[(i = o) >> 18 & 63] + n[i >> 12 & 63] + n[i >> 6 & 63] + n[63 & i]);
    return a.join("")
  }
  o["-".charCodeAt(0)] = 62,
  o["_".charCodeAt(0)] = 63
}
, function(e, t) {
  t.read = function(e, t, r, n, o) {
    var i, a, c = 8 * o - n - 1, u = (1 << c) - 1, s = u >> 1, f = -7, l = r ? o - 1 : 0, p = r ? -1 : 1, h = e[t + l];
    for (l += p,
    i = h & (1 << -f) - 1,
    h >>= -f,
    f += c; f > 0; i = 256 * i + e[t + l],
    l += p,
    f -= 8)
      ;
    for (a = i & (1 << -f) - 1,
    i >>= -f,
    f += n; f > 0; a = 256 * a + e[t + l],
    l += p,
    f -= 8)
      ;
    if (0 === i)
      i = 1 - s;
    else {
      if (i === u)
        return a ? NaN : 1 / 0 * (h ? -1 : 1);
      a += Math.pow(2, n),
      i -= s
    }
    return (h ? -1 : 1) * a * Math.pow(2, i - n)
  }
  ,
  t.write = function(e, t, r, n, o, i) {
    var a, c, u, s = 8 * i - o - 1, f = (1 << s) - 1, l = f >> 1, p = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0, h = n ? 0 : i - 1, d = n ? 1 : -1, y = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
    for (t = Math.abs(t),
    isNaN(t) || t === 1 / 0 ? (c = isNaN(t) ? 1 : 0,
    a = f) : (a = Math.floor(Math.log(t) / Math.LN2),
    t * (u = Math.pow(2, -a)) < 1 && (a--,
    u *= 2),
    (t += a + l >= 1 ? p / u : p * Math.pow(2, 1 - l)) * u >= 2 && (a++,
    u /= 2),
    a + l >= f ? (c = 0,
    a = f) : a + l >= 1 ? (c = (t * u - 1) * Math.pow(2, o),
    a += l) : (c = t * Math.pow(2, l - 1) * Math.pow(2, o),
    a = 0)); o >= 8; e[r + h] = 255 & c,
    h += d,
    c /= 256,
    o -= 8)
      ;
    for (a = a << o | c,
    s += o; s > 0; e[r + h] = 255 & a,
    h += d,
    a /= 256,
    s -= 8)
      ;
    e[r + h - d] |= 128 * y
  }
}
, function(e, t) {
  var r = {}.toString;
  e.exports = Array.isArray || function(e) {
    return "[object Array]" == r.call(e)
  }
}
, function(e, t, r) {
  var n, o;
  /**
 * @file Web Cryptography API shim
 * @author Artem S Vybornov <vybornov@gmail.com>
 * @license MIT
 */
  /**
 * @file Web Cryptography API shim
 * @author Artem S Vybornov <vybornov@gmail.com>
 * @license MIT
 */
  o = "undefined" != typeof self ? self : this,
  void 0 === (n = function() {
    return function(e) {
      "use strict";
      if ("function" != typeof Promise)
        throw "Promise support required";
      var t = e.crypto || e.msCrypto;
      if (t) {
        var r = t.subtle || t.webkitSubtle;
        if (r) {
          var n = e.Crypto || t.constructor || Object
            , o = e.SubtleCrypto || r.constructor || Object
            , i = (e.CryptoKey || e.Key || Object,
          e.navigator.userAgent.indexOf("Edge/") > -1)
            , a = !!e.msCrypto && !i
            , c = !t.subtle && !!t.webkitSubtle;
          if (a || c) {
            var u = {
              KoZIhvcNAQEB: "1.2.840.113549.1.1.1"
            }
              , s = {
              "1.2.840.113549.1.1.1": "KoZIhvcNAQEB"
            };
            if (["generateKey", "importKey", "unwrapKey"].forEach(function(e) {
              var n = r[e];
              r[e] = function(o, i, u) {
                var s, f, v, E, _, P = [].slice.call(arguments);
                switch (e) {
                case "generateKey":
                  s = y(o),
                  f = i,
                  v = u;
                  break;
                case "importKey":
                  s = y(u),
                  f = P[3],
                  v = P[4],
                  "jwk" === o && ((i = b(i)).alg || (i.alg = g(s)),
                  i.key_ops || (i.key_ops = "oct" !== i.kty ? "d"in i ? v.filter(S) : v.filter(w) : v.slice()),
                  P[1] = (_ = b(i),
                  a && (_.extractable = _.ext,
                  delete _.ext),
                  h(unescape(encodeURIComponent(JSON.stringify(_)))).buffer));
                  break;
                case "unwrapKey":
                  s = P[4],
                  f = P[5],
                  v = P[6],
                  P[2] = u._key
                }
                if ("generateKey" === e && "HMAC" === s.name && s.hash)
                  return s.length = s.length || {
                    "SHA-1": 512,
                    "SHA-256": 512,
                    "SHA-384": 1024,
                    "SHA-512": 1024
                  }[s.hash.name],
                  r.importKey("raw", t.getRandomValues(new Uint8Array(s.length + 7 >> 3)), s, f, v);
                if (c && "generateKey" === e && "RSASSA-PKCS1-v1_5" === s.name && (!s.modulusLength || s.modulusLength >= 2048))
                  return (o = y(o)).name = "RSAES-PKCS1-v1_5",
                  delete o.hash,
                  r.generateKey(o, !0, ["encrypt", "decrypt"]).then(function(e) {
                    return Promise.all([r.exportKey("jwk", e.publicKey), r.exportKey("jwk", e.privateKey)])
                  }).then(function(e) {
                    return e[0].alg = e[1].alg = g(s),
                    e[0].key_ops = v.filter(w),
                    e[1].key_ops = v.filter(S),
                    Promise.all([r.importKey("jwk", e[0], s, !0, e[0].key_ops), r.importKey("jwk", e[1], s, f, e[1].key_ops)])
                  }).then(function(e) {
                    return {
                      publicKey: e[0],
                      privateKey: e[1]
                    }
                  });
                if ((c || a && "SHA-1" === (s.hash || {}).name) && "importKey" === e && "jwk" === o && "HMAC" === s.name && "oct" === i.kty)
                  return r.importKey("raw", h(p(i.k)), u, P[3], P[4]);
                if (c && "importKey" === e && ("spki" === o || "pkcs8" === o))
                  return r.importKey("jwk", function(e) {
                    var t = m(e)
                      , r = !1;
                    t.length > 2 && (r = !0,
                    t.shift());
                    var n = {
                      ext: !0
                    };
                    switch (t[0][0]) {
                    case "1.2.840.113549.1.1.1":
                      var o = ["n", "e", "d", "p", "q", "dp", "dq", "qi"]
                        , i = m(t[1]);
                      r && i.shift();
                      for (var a = 0; a < i.length; a++)
                        i[a][0] || (i[a] = i[a].subarray(1)),
                        n[o[a]] = l(d(i[a]));
                      n.kty = "RSA";
                      break;
                    default:
                      throw new TypeError("Unsupported key type")
                    }
                    return n
                  }(i), u, P[3], P[4]);
                if (a && "unwrapKey" === e)
                  return r.decrypt(P[3], u, i).then(function(e) {
                    return r.importKey(o, e, P[4], P[5], P[6])
                  });
                try {
                  E = n.apply(r, P)
                } catch (e) {
                  return Promise.reject(e)
                }
                return a && (E = new Promise(function(e, t) {
                  E.onabort = E.onerror = function(e) {
                    t(e)
                  }
                  ,
                  E.oncomplete = function(t) {
                    e(t.target.result)
                  }
                }
                )),
                E = E.then(function(e) {
                  return "HMAC" === s.name && (s.length || (s.length = 8 * e.algorithm.length)),
                  0 == s.name.search("RSA") && (s.modulusLength || (s.modulusLength = (e.publicKey || e).algorithm.modulusLength),
                  s.publicExponent || (s.publicExponent = (e.publicKey || e).algorithm.publicExponent)),
                  e = e.publicKey && e.privateKey ? {
                    publicKey: new A(e.publicKey,s,f,v.filter(w)),
                    privateKey: new A(e.privateKey,s,f,v.filter(S))
                  } : new A(e,s,f,v)
                })
              }
            }),
            ["exportKey", "wrapKey"].forEach(function(e) {
              var t = r[e];
              r[e] = function(n, o, i) {
                var u, s = [].slice.call(arguments);
                switch (e) {
                case "exportKey":
                  s[1] = o._key;
                  break;
                case "wrapKey":
                  s[1] = o._key,
                  s[2] = i._key
                }
                if ((c || a && "SHA-1" === (o.algorithm.hash || {}).name) && "exportKey" === e && "jwk" === n && "HMAC" === o.algorithm.name && (s[0] = "raw"),
                !c || "exportKey" !== e || "spki" !== n && "pkcs8" !== n || (s[0] = "jwk"),
                a && "wrapKey" === e)
                  return r.exportKey(n, o).then(function(e) {
                    return "jwk" === n && (e = h(unescape(encodeURIComponent(JSON.stringify(b(e)))))),
                    r.encrypt(s[3], i, e)
                  });
                try {
                  u = t.apply(r, s)
                } catch (e) {
                  return Promise.reject(e)
                }
                return a && (u = new Promise(function(e, t) {
                  u.onabort = u.onerror = function(e) {
                    t(e)
                  }
                  ,
                  u.oncomplete = function(t) {
                    e(t.target.result)
                  }
                }
                )),
                "exportKey" === e && "jwk" === n && (u = u.then(function(e) {
                  return (c || a && "SHA-1" === (o.algorithm.hash || {}).name) && "HMAC" === o.algorithm.name ? {
                    kty: "oct",
                    alg: g(o.algorithm),
                    key_ops: o.usages.slice(),
                    ext: !0,
                    k: l(d(e))
                  } : ((e = b(e)).alg || (e.alg = g(o.algorithm)),
                  e.key_ops || (e.key_ops = "public" === o.type ? o.usages.filter(w) : "private" === o.type ? o.usages.filter(S) : o.usages.slice()),
                  e)
                })),
                !c || "exportKey" !== e || "spki" !== n && "pkcs8" !== n || (u = u.then(function(e) {
                  return e = function(e) {
                    var t, r = [["", null]], n = !1;
                    switch (e.kty) {
                    case "RSA":
                      for (var o = ["n", "e", "d", "p", "q", "dp", "dq", "qi"], i = [], a = 0; a < o.length && o[a]in e; a++) {
                        var c = i[a] = h(p(e[o[a]]));
                        128 & c[0] && (i[a] = new Uint8Array(c.length + 1),
                        i[a].set(c, 1))
                      }
                      i.length > 2 && (n = !0,
                      i.unshift(new Uint8Array([0]))),
                      r[0][0] = "1.2.840.113549.1.1.1",
                      t = i;
                      break;
                    default:
                      throw new TypeError("Unsupported key type")
                    }
                    return r.push(new Uint8Array(v(t)).buffer),
                    n ? r.unshift(new Uint8Array([0])) : r[1] = {
                      tag: 3,
                      value: r[1]
                    },
                    new Uint8Array(v(r)).buffer
                  }(b(e))
                })),
                u
              }
            }),
            ["encrypt", "decrypt", "sign", "verify"].forEach(function(e) {
              var t = r[e];
              r[e] = function(n, o, i, c) {
                if (a && (!i.byteLength || c && !c.byteLength))
                  throw new Error("Empy input is not allowed");
                var u, s = [].slice.call(arguments), f = y(n);
                if (a && "decrypt" === e && "AES-GCM" === f.name) {
                  var l = n.tagLength >> 3;
                  s[2] = (i.buffer || i).slice(0, i.byteLength - l),
                  n.tag = (i.buffer || i).slice(i.byteLength - l)
                }
                s[1] = o._key;
                try {
                  u = t.apply(r, s)
                } catch (e) {
                  return Promise.reject(e)
                }
                return a && (u = new Promise(function(t, r) {
                  u.onabort = u.onerror = function(e) {
                    r(e)
                  }
                  ,
                  u.oncomplete = function(r) {
                    if (r = r.target.result,
                    "encrypt" === e && r instanceof AesGcmEncryptResult) {
                      var n = r.ciphertext
                        , o = r.tag;
                      (r = new Uint8Array(n.byteLength + o.byteLength)).set(new Uint8Array(n), 0),
                      r.set(new Uint8Array(o), n.byteLength),
                      r = r.buffer
                    }
                    t(r)
                  }
                }
                )),
                u
              }
            }),
            a) {
              var f = r.digest;
              r.digest = function(e, t) {
                if (!t.byteLength)
                  throw new Error("Empy input is not allowed");
                var n;
                try {
                  n = f.call(r, e, t)
                } catch (e) {
                  return Promise.reject(e)
                }
                return n = new Promise(function(e, t) {
                  n.onabort = n.onerror = function(e) {
                    t(e)
                  }
                  ,
                  n.oncomplete = function(t) {
                    e(t.target.result)
                  }
                }
                )
              }
              ,
              e.crypto = Object.create(t, {
                getRandomValues: {
                  value: function(e) {
                    return t.getRandomValues(e)
                  }
                },
                subtle: {
                  value: r
                }
              }),
              e.CryptoKey = A
            }
            c && (t.subtle = r,
            e.Crypto = n,
            e.SubtleCrypto = o,
            e.CryptoKey = A)
          }
        }
      }
      function l(e) {
        return btoa(e).replace(/\=+$/, "").replace(/\+/g, "-").replace(/\//g, "_")
      }
      function p(e) {
        return e = (e += "===").slice(0, -e.length % 4),
        atob(e.replace(/-/g, "+").replace(/_/g, "/"))
      }
      function h(e) {
        for (var t = new Uint8Array(e.length), r = 0; r < e.length; r++)
          t[r] = e.charCodeAt(r);
        return t
      }
      function d(e) {
        return e instanceof ArrayBuffer && (e = new Uint8Array(e)),
        String.fromCharCode.apply(String, e)
      }
      function y(e) {
        var t = {
          name: (e.name || e || "").toUpperCase().replace("V", "v")
        };
        switch (t.name) {
        case "SHA-1":
        case "SHA-256":
        case "SHA-384":
        case "SHA-512":
          break;
        case "AES-CBC":
        case "AES-GCM":
        case "AES-KW":
          e.length && (t.length = e.length);
          break;
        case "HMAC":
          e.hash && (t.hash = y(e.hash)),
          e.length && (t.length = e.length);
          break;
        case "RSAES-PKCS1-v1_5":
          e.publicExponent && (t.publicExponent = new Uint8Array(e.publicExponent)),
          e.modulusLength && (t.modulusLength = e.modulusLength);
          break;
        case "RSASSA-PKCS1-v1_5":
        case "RSA-OAEP":
          e.hash && (t.hash = y(e.hash)),
          e.publicExponent && (t.publicExponent = new Uint8Array(e.publicExponent)),
          e.modulusLength && (t.modulusLength = e.modulusLength);
          break;
        default:
          throw new SyntaxError("Bad algorithm name")
        }
        return t
      }
      function g(e) {
        return {
          HMAC: {
            "SHA-1": "HS1",
            "SHA-256": "HS256",
            "SHA-384": "HS384",
            "SHA-512": "HS512"
          },
          "RSASSA-PKCS1-v1_5": {
            "SHA-1": "RS1",
            "SHA-256": "RS256",
            "SHA-384": "RS384",
            "SHA-512": "RS512"
          },
          "RSAES-PKCS1-v1_5": {
            "": "RSA1_5"
          },
          "RSA-OAEP": {
            "SHA-1": "RSA-OAEP",
            "SHA-256": "RSA-OAEP-256"
          },
          "AES-KW": {
            128: "A128KW",
            192: "A192KW",
            256: "A256KW"
          },
          "AES-GCM": {
            128: "A128GCM",
            192: "A192GCM",
            256: "A256GCM"
          },
          "AES-CBC": {
            128: "A128CBC",
            192: "A192CBC",
            256: "A256CBC"
          }
        }[e.name][(e.hash || {}).name || e.length || ""]
      }
      function b(e) {
        (e instanceof ArrayBuffer || e instanceof Uint8Array) && (e = JSON.parse(decodeURIComponent(escape(d(e)))));
        var t = {
          kty: e.kty,
          alg: e.alg,
          ext: e.ext || e.extractable
        };
        switch (t.kty) {
        case "oct":
          t.k = e.k;
        case "RSA":
          ["n", "e", "d", "p", "q", "dp", "dq", "qi", "oth"].forEach(function(r) {
            r in e && (t[r] = e[r])
          });
          break;
        default:
          throw new TypeError("Unsupported key type")
        }
        return t
      }
      function m(e, t) {
        if (e instanceof ArrayBuffer && (e = new Uint8Array(e)),
        t || (t = {
          pos: 0,
          end: e.length
        }),
        t.end - t.pos < 2 || t.end > e.length)
          throw new RangeError("Malformed DER");
        var r, n = e[t.pos++], o = e[t.pos++];
        if (o >= 128) {
          if (o &= 127,
          t.end - t.pos < o)
            throw new RangeError("Malformed DER");
          for (var i = 0; o--; )
            i <<= 8,
            i |= e[t.pos++];
          o = i
        }
        if (t.end - t.pos < o)
          throw new RangeError("Malformed DER");
        switch (n) {
        case 2:
          r = e.subarray(t.pos, t.pos += o);
          break;
        case 3:
          if (e[t.pos++])
            throw new Error("Unsupported bit string");
          o--;
        case 4:
          r = new Uint8Array(e.subarray(t.pos, t.pos += o)).buffer;
          break;
        case 5:
          r = null;
          break;
        case 6:
          var a = btoa(d(e.subarray(t.pos, t.pos += o)));
          if (!(a in u))
            throw new Error("Unsupported OBJECT ID " + a);
          r = u[a];
          break;
        case 48:
          r = [];
          for (var c = t.pos + o; t.pos < c; )
            r.push(m(e, t));
          break;
        default:
          throw new Error("Unsupported DER tag 0x" + n.toString(16))
        }
        return r
      }
      function v(e, t) {
        t || (t = []);
        var r = 0
          , n = 0
          , o = t.length + 2;
        if (t.push(0, 0),
        e instanceof Uint8Array) {
          r = 2,
          n = e.length;
          for (var i = 0; i < n; i++)
            t.push(e[i])
        } else if (e instanceof ArrayBuffer) {
          r = 4,
          n = e.byteLength,
          e = new Uint8Array(e);
          for (var i = 0; i < n; i++)
            t.push(e[i])
        } else if (null === e)
          r = 5,
          n = 0;
        else if ("string" == typeof e && e in s) {
          var a = h(atob(s[e]));
          r = 6,
          n = a.length;
          for (var i = 0; i < n; i++)
            t.push(a[i])
        } else if (e instanceof Array) {
          for (var i = 0; i < e.length; i++)
            v(e[i], t);
          r = 48,
          n = t.length - o
        } else {
          if (!("object" == typeof e && 3 === e.tag && e.value instanceof ArrayBuffer))
            throw new Error("Unsupported DER value " + e);
          e = new Uint8Array(e.value),
          r = 3,
          n = e.byteLength,
          t.push(0);
          for (var i = 0; i < n; i++)
            t.push(e[i]);
          n++
        }
        if (n >= 128) {
          var c = n
            , n = 4;
          for (t.splice(o, 0, c >> 24 & 255, c >> 16 & 255, c >> 8 & 255, 255 & c); n > 1 && !(c >> 24); )
            c <<= 8,
            n--;
          n < 4 && t.splice(o, 4 - n),
          n |= 128
        }
        return t.splice(o - 2, 2, r, n),
        t
      }
      function A(e, t, r, n) {
        Object.defineProperties(this, {
          _key: {
            value: e
          },
          type: {
            value: e.type,
            enumerable: !0
          },
          extractable: {
            value: void 0 === r ? e.extractable : r,
            enumerable: !0
          },
          algorithm: {
            value: void 0 === t ? e.algorithm : t,
            enumerable: !0
          },
          usages: {
            value: void 0 === n ? e.usages : n,
            enumerable: !0
          }
        })
      }
      function w(e) {
        return "verify" === e || "encrypt" === e || "wrapKey" === e
      }
      function S(e) {
        return "sign" === e || "decrypt" === e || "unwrapKey" === e
      }
    }(o)
  }
  .apply(t, [])) || (e.exports = n)
}
, function(e, t, r) {
  (function(t, r) {
    !function() {
      var n = 1
        , o = {}
        , i = !1;
      function a(e) {
        t.setImmediate ? r(e) : t.importScripts ? setTimeout(e) : (o[++n] = e,
        t.postMessage(n, "*"))
      }
      function c(e) {
        "use strict";
        if ("function" != typeof e && null != e)
          throw TypeError();
        if ("object" != typeof this || this && this.then)
          throw TypeError();
        var t, r, n = this, o = 0, i = 0, u = [];
        n.promise = n,
        n.resolve = function(e) {
          return t = n.fn,
          r = n.er,
          o || (i = e,
          o = 1,
          a(l)),
          n
        }
        ,
        n.reject = function(e) {
          return t = n.fn,
          r = n.er,
          o || (i = e,
          o = 2,
          a(l)),
          n
        }
        ,
        n._d = 1,
        n.then = function(e, t) {
          if (1 != this._d)
            throw TypeError();
          var r = new c;
          return r.fn = e,
          r.er = t,
          3 == o ? r.resolve(i) : 4 == o ? r.reject(i) : u.push(r),
          r
        }
        ,
        n.catch = function(e) {
          return n.then(null, e)
        }
        ;
        var s = function(e) {
          o = e || 4,
          u.map(function(e) {
            3 == o && e.resolve(i) || e.reject(i)
          })
        };
        try {
          "function" == typeof e && e(n.resolve, n.reject)
        } catch (e) {
          n.reject(e)
        }
        return n;
        function f(e, t, r, n) {
          if (2 == o)
            return n();
          if ("object" != typeof i && "function" != typeof i || "function" != typeof e)
            n();
          else
            try {
              var a = 0;
              e.call(i, function(e) {
                a++ || (i = e,
                t())
              }, function(e) {
                a++ || (i = e,
                r())
              })
            } catch (e) {
              i = e,
              r()
            }
        }
        function l() {
          var e;
          try {
            e = i && i.then
          } catch (e) {
            return i = e,
            o = 2,
            l()
          }
          f(e, function() {
            o = 1,
            l()
          }, function() {
            o = 2,
            l()
          }, function() {
            try {
              1 == o && "function" == typeof t ? i = t(i) : 2 == o && "function" == typeof r && (i = r(i),
              o = 1)
            } catch (e) {
              return i = e,
              s()
            }
            i == n ? (i = TypeError(),
            s()) : f(e, function() {
              s(3)
            }, s, function() {
              s(1 == o && 3)
            })
          })
        }
      }
      (t = this).setImmediate || t.addEventListener("message", function(e) {
        if (e.source == t)
          if (i)
            a(o[e.data]);
          else {
            i = !0;
            try {
              o[e.data]()
            } catch (e) {}
            delete o[e.data],
            i = !1
          }
      }),
      c.resolve = function(e) {
        if (1 != this._d)
          throw TypeError();
        return e instanceof c ? e : new c(function(t) {
          t(e)
        }
        )
      }
      ,
      c.reject = function(e) {
        if (1 != this._d)
          throw TypeError();
        return new c(function(t, r) {
          r(e)
        }
        )
      }
      ,
      c.all = function(e) {
        if (1 != this._d)
          throw TypeError();
        if (!(e instanceof Array))
          return c.reject(TypeError());
        var t = new c;
        return function r(n, o) {
          return o ? t.resolve(o) : n ? t.reject(n) : (0 == e.reduce(function(e, t) {
            return t && t.then ? e + 1 : e
          }, 0) && t.resolve(e),
          void e.map(function(t, n) {
            t && t.then && t.then(function(t) {
              return e[n] = t,
              r(),
              t
            }, r)
          }))
        }(),
        t
      }
      ,
      c.race = function(e) {
        if (1 != this._d)
          throw TypeError();
        if (!(e instanceof Array))
          return c.reject(TypeError());
        if (0 == e.length)
          return new c;
        var t = new c;
        return function r(n, o) {
          return o ? t.resolve(o) : n ? t.reject(n) : (0 == e.reduce(function(e, t) {
            return t && t.then ? e + 1 : e
          }, 0) && t.resolve(e),
          void e.map(function(e, t) {
            e && e.then && e.then(function(e) {
              r(null, e)
            }, r)
          }))
        }(),
        t
      }
      ,
      c._d = 1,
      e.exports = c
    }()
  }
  ).call(this, r(1), r(10).setImmediate)
}
, function(e, t, r) {
  (function(e) {
    var n = void 0 !== e && e || "undefined" != typeof self && self || window
      , o = Function.prototype.apply;
    function i(e, t) {
      this._id = e,
      this._clearFn = t
    }
    t.setTimeout = function() {
      return new i(o.call(setTimeout, n, arguments),clearTimeout)
    }
    ,
    t.setInterval = function() {
      return new i(o.call(setInterval, n, arguments),clearInterval)
    }
    ,
    t.clearTimeout = t.clearInterval = function(e) {
      e && e.close()
    }
    ,
    i.prototype.unref = i.prototype.ref = function() {}
    ,
    i.prototype.close = function() {
      this._clearFn.call(n, this._id)
    }
    ,
    t.enroll = function(e, t) {
      clearTimeout(e._idleTimeoutId),
      e._idleTimeout = t
    }
    ,
    t.unenroll = function(e) {
      clearTimeout(e._idleTimeoutId),
      e._idleTimeout = -1
    }
    ,
    t._unrefActive = t.active = function(e) {
      clearTimeout(e._idleTimeoutId);
      var t = e._idleTimeout;
      t >= 0 && (e._idleTimeoutId = setTimeout(function() {
        e._onTimeout && e._onTimeout()
      }, t))
    }
    ,
    r(11),
    t.setImmediate = "undefined" != typeof self && self.setImmediate || void 0 !== e && e.setImmediate || this && this.setImmediate,
    t.clearImmediate = "undefined" != typeof self && self.clearImmediate || void 0 !== e && e.clearImmediate || this && this.clearImmediate
  }
  ).call(this, r(1))
}
, function(e, t, r) {
  (function(e, t) {
    !function(e, r) {
      "use strict";
      if (!e.setImmediate) {
        var n, o, i, a, c, u = 1, s = {}, f = !1, l = e.document, p = Object.getPrototypeOf && Object.getPrototypeOf(e);
        p = p && p.setTimeout ? p : e,
        "[object process]" === {}.toString.call(e.process) ? n = function(e) {
          t.nextTick(function() {
            d(e)
          })
        }
        : !function() {
          if (e.postMessage && !e.importScripts) {
            var t = !0
              , r = e.onmessage;
            return e.onmessage = function() {
              t = !1
            }
            ,
            e.postMessage("", "*"),
            e.onmessage = r,
            t
          }
        }() ? e.MessageChannel ? ((i = new MessageChannel).port1.onmessage = function(e) {
          d(e.data)
        }
        ,
        n = function(e) {
          i.port2.postMessage(e)
        }
        ) : l && "onreadystatechange"in l.createElement("script") ? (o = l.documentElement,
        n = function(e) {
          var t = l.createElement("script");
          t.onreadystatechange = function() {
            d(e),
            t.onreadystatechange = null,
            o.removeChild(t),
            t = null
          }
          ,
          o.appendChild(t)
        }
        ) : n = function(e) {
          setTimeout(d, 0, e)
        }
        : (a = "setImmediate$" + Math.random() + "$",
        c = function(t) {
          t.source === e && "string" == typeof t.data && 0 === t.data.indexOf(a) && d(+t.data.slice(a.length))
        }
        ,
        e.addEventListener ? e.addEventListener("message", c, !1) : e.attachEvent("onmessage", c),
        n = function(t) {
          e.postMessage(a + t, "*")
        }
        ),
        p.setImmediate = function(e) {
          "function" != typeof e && (e = new Function("" + e));
          for (var t = new Array(arguments.length - 1), r = 0; r < t.length; r++)
            t[r] = arguments[r + 1];
          var o = {
            callback: e,
            args: t
          };
          return s[u] = o,
          n(u),
          u++
        }
        ,
        p.clearImmediate = h
      }
      function h(e) {
        delete s[e]
      }
      function d(e) {
        if (f)
          setTimeout(d, 0, e);
        else {
          var t = s[e];
          if (t) {
            f = !0;
            try {
              !function(e) {
                var t = e.callback
                  , n = e.args;
                switch (n.length) {
                case 0:
                  t();
                  break;
                case 1:
                  t(n[0]);
                  break;
                case 2:
                  t(n[0], n[1]);
                  break;
                case 3:
                  t(n[0], n[1], n[2]);
                  break;
                default:
                  t.apply(r, n)
                }
              }(t)
            } finally {
              h(e),
              f = !1
            }
          }
        }
      }
    }("undefined" == typeof self ? void 0 === e ? this : e : self)
  }
  ).call(this, r(1), r(12))
}
, function(e, t) {
  var r, n, o = e.exports = {};
  function i() {
    throw new Error("setTimeout has not been defined")
  }
  function a() {
    throw new Error("clearTimeout has not been defined")
  }
  function c(e) {
    if (r === setTimeout)
      return setTimeout(e, 0);
    if ((r === i || !r) && setTimeout)
      return r = setTimeout,
      setTimeout(e, 0);
    try {
      return r(e, 0)
    } catch (t) {
      try {
        return r.call(null, e, 0)
      } catch (t) {
        return r.call(this, e, 0)
      }
    }
  }
  !function() {
    try {
      r = "function" == typeof setTimeout ? setTimeout : i
    } catch (e) {
      r = i
    }
    try {
      n = "function" == typeof clearTimeout ? clearTimeout : a
    } catch (e) {
      n = a
    }
  }();
  var u, s = [], f = !1, l = -1;
  function p() {
    f && u && (f = !1,
    u.length ? s = u.concat(s) : l = -1,
    s.length && h())
  }
  function h() {
    if (!f) {
      var e = c(p);
      f = !0;
      for (var t = s.length; t; ) {
        for (u = s,
        s = []; ++l < t; )
          u && u[l].run();
        l = -1,
        t = s.length
      }
      u = null,
      f = !1,
      function(e) {
        if (n === clearTimeout)
          return clearTimeout(e);
        if ((n === a || !n) && clearTimeout)
          return n = clearTimeout,
          clearTimeout(e);
        try {
          n(e)
        } catch (t) {
          try {
            return n.call(null, e)
          } catch (t) {
            return n.call(this, e)
          }
        }
      }(e)
    }
  }
  function d(e, t) {
    this.fun = e,
    this.array = t
  }
  function y() {}
  o.nextTick = function(e) {
    var t = new Array(arguments.length - 1);
    if (arguments.length > 1)
      for (var r = 1; r < arguments.length; r++)
        t[r - 1] = arguments[r];
    s.push(new d(e,t)),
    1 !== s.length || f || c(h)
  }
  ,
  d.prototype.run = function() {
    this.fun.apply(null, this.array)
  }
  ,
  o.title = "browser",
  o.browser = !0,
  o.env = {},
  o.argv = [],
  o.version = "",
  o.versions = {},
  o.on = y,
  o.addListener = y,
  o.once = y,
  o.off = y,
  o.removeListener = y,
  o.removeAllListeners = y,
  o.emit = y,
  o.prependListener = y,
  o.prependOnceListener = y,
  o.listeners = function(e) {
    return []
  }
  ,
  o.binding = function(e) {
    throw new Error("process.binding is not supported")
  }
  ,
  o.cwd = function() {
    return "/"
  }
  ,
  o.chdir = function(e) {
    throw new Error("process.chdir is not supported")
  }
  ,
  o.umask = function() {
    return 0
  }
}
, function(e, t, r) {
  "use strict";
  r.r(t);
  var n = r(0);
  var o = {
    production: {
      kid: "JHA10LAKEFG0T7CIBS1O14Chn6lq3cdOxq-Wwqa62ZUwKvnm4",
      publicKey: {
        e: 65537,
        n: "00:90:fb:a3:c1:52:63:7a:f2:3f:a1:e6:70:66:80:36:5a:3b:7d:e0:31:5c:32:f4:42:69:bf:22:46:21:06:ac:67:ca:5a:d3:42:c1:06:24:ca:5c:ae:46:80:7a:d7:97:18:9b:60:55:6e:fa:0a:1f:c6:32:bf:46:82:dd:dc:1a:87:a5:26:39:d2:6c:ce:62:f4:a5:5f:dc:6f:1f:ed:5f:35:a0:62:0d:ec:60:db:29:d2:c0:71:50:57:10:d4:0e:83:55:bc:8e:c7:12:5b:9a:7c:25:1c:61:39:7e:4b:b3:26:bf:aa:aa:e9:77:46:cc:2c:08:6f:af:3e:b8:7f:fb:ed:bf:45:28:a9:6b:d9:55:af:d8:2f:7c:8e:00:6c:50:01:2d:3a:8a:7a:da:34:ad:63:db:20:12:9d:85:c1:90:ec:93:0f:c7:3a:bc:db:7f:4a:3d:46:5f:4b:23:6e:78:07:1d:2f:ec:87:00:38:b7:2f:65:52:cd:d1:7b:b5:2e:ec:8b:7b:9e:fc:81:68:5c:3a:5b:82:0b:05:c6:f1:2d:ef:d5:25:04:33:81:b1:a8:1c:fe:6b:3d:fd:9b:18:94:96:8a:09:3f:19:8f:08:5a:90:ca:3f:f9:97:5c:f7:b9:ae:75:58:f5:8f:3d:bf:2f:99:78:97:fc:e2:6c:5e:6b:8b"
      }
    },
    development: {
      kid: "IPW4W1DX5D4N5E8LMAC6115la44Nu9zYob_bgrg5EUMksbgT4",
      publicKey: {
        e: 65537,
        n: "00:ba:7e:ed:8a:98:e9:99:fb:bb:0d:d8:bf:b3:89:4c:13:74:93:67:0c:02:c9:e8:32:8d:42:2c:5a:fd:ac:cb:67:0e:c9:4b:2e:73:65:7a:1a:d2:45:6c:b8:28:d7:06:ac:1d:8b:0d:1b:88:96:22:35:c1:6f:5f:95:c7:09:0a:d5:fd:92:be:65:fc:36:14:ed:4a:60:5f:f3:bc:b9:20:a5:7e:cb:9c:35:c4:ef:09:26:78:3c:19:3e:d2:a2:9b:dd:b4:15:63:b2:a6:49:21:94:15:e4:37:d4:1e:e0:d9:f1:79:e7:01:a7:56:83:3b:37:59:be:9e:57:e8:9c:a8:84:2b:49:dd:5d:3d:04:37:fd:09:5f:59:93:20:f6:01:d2:d2:1a:57:1d:aa:6f:58:5c:ec:e2:df:77:ae:02:bf:9e:f3:bb:4e:e9:90:60:99:64:08:a4:84:71:c0:19:f0:ee:64:39:89:6d:bc:34:bf:03:f0:2e:69:8a:78:6d:20:9a:15:8f:64:b6:ee:5d:1a:4d:5b:2c:c9:87:a1:41:ee:92:f3:b4:56:24:35:73:53:e1:8c:4b:91:d6:f1:9f:31:6d:c8:a5:50:12:bf:d8:c1:a3:61:7f:4f:a5:6a:5b:98:91:94:68:bf:8f:49:5f:d5:e3:62:a1:a5:cc:98:7d:91:bb"
      }
    },
    cert: {
      kid: "IPW4W1DX5D4N5E8LMAC6115la44Nu9zYob_bgrg5EUMksbgT4",
      publicKey: {
        e: 65537,
        n: "1u29h6v2bcwNqCDatnQm6T4S_vKfXO-Hsp26abg9N9D-ENKKt3cQRQH8Pq6SeI74Y6VtWSYGo2bpK1p9dWXKHep-a9L6ugxO3UhilFFE_ZosL0KKOdALn4V-GWvIUPc7FittBn__IWS99eP1NJdtu89WH4MbCuSGbKjmmoak35GxC5cJTe858nVyTM7OqyHH52rDxpD3csl7GSgA56RHdoZMABkf3hH2men3DOji8l36gZaCPqlHKc6MP4b5RxP-uGaVNaxSd16PsZ15is8__EgQAK_PXP4mWUFGbEYFu-5NUhjmwngsywjc0HT9UncczvgePtKOh0ves49oFqQDMw"
      }
    },
    sandbox: {
      kid: "1bdab3cc",
      publicKey: {
        e: 65537,
        n: "00:b1:93:c8:ba:c0:df:ef:24:27:9e:10:64:53:d9:ae:d7:85:4e:3b:70:ab:ba:2d:db:ee:b0:1f:d8:a6:1e:a1:b5:11:99:70:35:ed:bd:49:5f:d8:e0:d0:27:7e:be:0a:66:bb:24:eb:c4:15:12:73:ee:1b:d3:e5:0f:81:2c:06:16:a3:d6:52:9c:74:f0:4c:6a:af:03:c3:3a:f1:68:8c:1a:2e:db:09:72:ab:c6:dc:cb:45:2c:f8:17:de:0b:34:84:e6:53:15:75:25:d3:5d:75:dc:36:ab:be:a9:bd:b6:8c:20:82:24:02:e9:c6:c0:2b:b1:ba:0c:39:7b:0b:79:d8:77:33:85:cd:43:95:c6:02:d4:5f:ed:bf:be:b9:36:39:0e:bf:4a:2d:8c:94:bd:92:80:9d:8d:38:30:a2:4f:10:ee:78:62:22:05:33:90:d3:02:13:4e:9a:cd:3c:f6:37:4c:77:1f:94:44:82:89:8c:f5:36:f9:1a:47:1b:5b:bc:2c:21:b4:db:c4:53:22:93:ec:35:b4:5a:9e:e4:b9:4c:06:3f:ce:5c:43:81:bd:61:28:9d:fa:61:b6:44:34:72:e0:f4:f5:d3:06:17:4e:32:55:3d:d0:34:cb:95:f7:1b:2d:36:be:0f:b0:e0:96:30:1a:58:2b:af:cc:b3:da:1b"
      }
    },
    amex: {
      kid: "src-amex-card-enc-01",
      publicKey: {
        e: 65537,
        n: "98:16:bc:c4:d7:1c:0a:25:a5:33:07:d9:05:89:ca:79:4c:b8:e0:9b:b0:fd:a7:4e:5b:76:d3:0b:46:3b:17:3a:04:ab:a7:ee:08:f0:a2:c5:7f:cd:18:39:98:93:ec:f8:f9:25:6a:96:3d:bf:20:b5:66:4b:72:3c:60:ef:cd:45:75:64:c8:fc:0f:17:48:d9:b6:9e:8f:4d:de:97:82:d4:4f:d5:cc:eb:97:fb:f2:3f:4b:ab:40:63:17:cc:09:33:c6:9d:05:3e:28:c3:b5:d6:c5:0f:72:0d:3d:c7:fe:e5:ed:7b:26:57:f6:44:5e:98:ce:a8:31:85:1b:56:ca:bc:33:66:58:66:0e:11:50:6d:6f:55:ac:f2:ee:5e:d0:1b:61:99:94:9c:14:27:08:6a:ac:c6:5b:5f:95:4f:ab:cc:8c:31:f5:b5:70:8b:b9:6c:b5:22:cc:6c:bf:22:00:3b:d1:1b:59:6b:50:b2:f9:1f:4c:94:93:75:f2:d4:39:70:7e:18:9d:04:0c:e3:9a:69:3f:89:d3:43:d1:64:b6:a6:59:7f:bf:1f:5b:f9:21:9a:be:53:85:75:ad:60:5c:fb:09:f6:f9:b7:a7:fd:e9:35:a7:5d:fe:04:77:12:55:5f:0e:f5:90:ca:01:59:fd:18:ec:0b:35:05:58:d6:a9:06:b6:af:18:90:60:06:7e:f2:b5:92:43:77:ec:9e:54:84:6d:47:50:04:18:18:f9:b0:1e:7a:d5:c5:37:ee:f1:f1:b3:a1:ef:f3:aa:db:d1:d1:d8:0d:26:a6:1f:7b:1a:fe:a1:76:9d:d9:94:48:df:56:10:2b:7d:28:35:a1:f0:47:11:af:6b:f7:db:ae:7b:99:c1:80:d7:05:bc:22:d5:6c:3f:8c:41:bd:75:f4:2d:db:40:84:0e:5c:ae:fa:70:40:97:49:b5:d1:b1:f3:e1:81:81:4d:6e:1a:32:6d:4f:6b:e1:70:63:b2:32:40:b5:28:72:c4:00:99:33:e5:76:8d"
      }
    },
    masterCard: {
      kid: "149123-src-fpan-encryption",
      publicKey: {
        e: 65537,
        n: "vt4nDSPStTlM1NNcycvIqUf4x14I4jiTqMTKPjGtay0yfa1vByNChmuppDwET5gGGlpL8ccj3YVsBi9_bWoe_appkPwhxd7wR9RywV3zmWuMIhMwlk0lnHAML65nsHVM3oEpEvCfAPs1NXltTyfjnkgFENI3tHqtwdtM8eP02pp0jvW69fybvyVhLzXwSOgJntjtjRV7hQr5led_jWb5zzXI48OVTT_F9iinDdtX5y3E-if5WtGZUFETb_tZFZYnMLaLlHwvb6Zkr84RSwwsMf2nAL_4zP2UahMwzamhBoOSaqyxGxEq67Hr1U8zAC5hl9D8NbgSwpWxsODUrHx9rw"
      }
    },
    discover: {
      kid: "NTdkMDA1YTVjM2UyOTkzMmFiZDdmMWE0Y2IyZGE4NTMyNmNjNTVmZDM1ZGRkMDE0NmFjN2FiYzgyYjc4OWQ1NAo",
      publicKey: {
        e: 65537,
        n: "00:9b:52:d4:cf:a2:74:bf:c6:f2:58:aa:0b:9c:59:39:88:dd:02:3c:d0:23:5f:32:1a:8c:3b:af:2f:9e:d1:ad:63:0a:d1:7c:dd:fc:a5:69:4a:86:6c:a9:35:e2:d5:35:40:1a:6d:12:d8:5e:f2:a7:06:f1:83:14:13:b8:67:d5:12:02:e2:b7:c0:e1:83:c9:fd:72:d9:23:08:22:67:15:fc:e4:cc:59:0d:51:aa:08:21:53:37:99:9d:6d:13:8a:33:8a:66:87:82:b7:c5:71:5c:7d:51:4b:8e:0d:0a:35:9f:d1:f2:76:41:f0:1f:92:05:3c:68:5a:a0:28:52:66:f3:4f:e2:0d:58:93:45:b9:68:84:71:b8:67:84:92:49:e6:ed:49:d4:4e:9b:00:4b:b8:77:f0:60:e7:ca:9c:73:85:79:0c:f3:be:9d:47:65:8a:d6:75:15:c1:1a:b1:c0:03:bc:d2:d3:65:32:ea:46:97:3a:1f:67:46:36:d3:95:7b:f3:c5:da:02:5a:d9:aa:d7:04:03:1d:ab:e8:43:05:02:cf:ba:1a:35:f9:f1:15:59:6c:60:aa:a9:80:02:65:18:01:2e:5c:92:81:a2:b2:43:62:38:25:b7:72:d0:8f:4d:f4:5e:f9:16:ed:5b:7d:74:83:75:fa:1e:c3:28:f5:05"
      }
    }
  };
  async function i(e, t) {
    return console.log("Card Information used for PANJW Encryption => ", e),
    await t.encrypt(JSON.stringify(e)).then(e=>e)
  }
  function a() {
    var e = {
      card: {}
    }
      , t = document.getElementById("cardInformation").value;
    if ((t = JSON.parse(t)).ExpirationDate) {
      var r = t.ExpirationDate.split("/");
      e.card.cardSecurityCode = t.Cvv2Value,
      e.card.cardholderFullName = t.CardholderName || "SRC SDK",
      e.card.panExpirationMonth = parseInt(r[0]),
      e.card.panExpirationYear = parseInt("20" + r[1]),
      e.card.primaryAccountNumber = t.PrimaryAccountNumber
    } else
      e = t;
    return e
  }
  $(function() {
    var e = document.querySelector("#addToEnrollAPIButton");
    e && e.addEventListener("click", async function() {
      i(a()).then(e=>{
        console.log("PANJW Encrypted Data: ", e);
        var t = document.getElementById("enrollCardInput").value;
        (t = JSON.parse(t)).encryptedCard = e,
        document.getElementById("enrollCardInput").value = JSON.stringify(t, void 0, 4)
      }
      )
    }, !1)
  }),
  $(function() {
    var e = document.querySelector("#addToCheckoutAPIButton");
    e && e.addEventListener("click", async function() {
      var e, t = localStorage.getItem("srciDomain");
      t && t.includes("sandbox.secure.checkout.visa") ? e = "sandbox" : t.includes("vbox") ? e = "development" : t.includes("k8s") ? e = "development" : t.includes("int") ? e = "cert" : t.includes("cert") ? e = "cert" : t && t.includes("secure.checkout.visa") && (e = "production");
      const r = o[e];
      var {kid: c, publicKey: u} = r
        , s = localStorage.getItem("initiatorId")
        , f = localStorage.getItem("panEncryId");
      console.log("Pan Encryption Key retrived : " + f),
      "production" != e && (f ? c = f : s ? c = s : location.origin.includes("462") ? c = "IBZOZYMVSY9JYT6WJVL7111CUWmhc5egkwGjHgBD_kQto66S8" : location.origin.includes("671") && (c = "IPW4W1DX5D4N5E8LMAC6115la44Nu9zYob_bgrg5EUMksbgT4")),
      console.log("Environment identified for PANJW encryption - " + e),
      console.log("KID used for PAN Encryption: " + c),
      console.log("Public Key Used for PAN Encryption: " + JSON.stringify(u));
      const l = new n.PANJWE(c,u);
      i(a(), l).then(e=>{
        console.log("PANJW Encrypted Data: ", e);
        var t = document.getElementById("selectCardInput").value;
        (t = JSON.parse(t)).encryptedCard = e,
        document.getElementById("selectCardInput").value = JSON.stringify(t, void 0, 4)
      }
      )
    }, !1)
  }),
  $(function() {
    var e = document.querySelector("#pspAddToCheckoutAPIButton");
    e && e.addEventListener("click", async function() {
      var e, t = localStorage.getItem("srciDomain");
      t && t.includes("sandbox.secure.checkout.visa") ? e = "sandbox" : t.includes("vbox") ? e = "development" : t.includes("k8s") ? e = "development" : t.includes("int") ? e = "cert" : t.includes("cert") ? e = "cert" : t && t.includes("secure.checkout.visa") && (e = "production");
      const r = o[e];
      var {kid: a, publicKey: c} = r
        , u = localStorage.getItem("initiatorId")
        , s = localStorage.getItem("panEncryId");
      console.log("Pan Encryption Key retrived : " + s),
      "production" != e && (s ? a = s : u ? a = u : location.origin.includes("462") ? a = "IBZOZYMVSY9JYT6WJVL7111CUWmhc5egkwGjHgBD_kQto66S8" : location.origin.includes("671") && (a = "IPW4W1DX5D4N5E8LMAC6115la44Nu9zYob_bgrg5EUMksbgT4")),
      console.log("Environment identified for PANJW encryption - " + e),
      console.log("KID used for PAN Encryption: " + a),
      console.log("Public Key Used for PAN Encryption: " + JSON.stringify(c));
      const f = new n.PANJWE(a,c);
      i(JSON.parse(document.getElementById("pspCardInformation").value), f).then(e=>{
        console.log("PANJW Encrypted Data: ", e);
        var t = document.getElementById("selectCardInput").value;
        (t = JSON.parse(t)).encryptedCard = e,
        document.getElementById("selectCardInput").value = JSON.stringify(t, void 0, 4)
      }
      )
    }, !1)
  }),
  $(function() {
    var e = document.querySelector("#addToEnrollAPIButtonAmex");
    e && e.addEventListener("click", async function() {
      var e = document.getElementById("cardInformation").value;
      i(e = JSON.parse(e)).then(e=>{
        console.log("PANJW Encrypted Data: ", e);
        var t = document.getElementById("enrollCardInput").value;
        (t = JSON.parse(t)).encryptedCard = e,
        document.getElementById("enrollCardInput").value = JSON.stringify(t, void 0, 4)
      }
      )
    }, !1)
  }),
  $(function() {
    var e = document.querySelector("#addToCheckoutAPIButtonAmex");
    e && e.addEventListener("click", async function() {
      const e = o.amex;
      var {kid: t, publicKey: r} = e;
      console.log("KID used for PAN Encryption: " + t),
      console.log("Public Key Used for PAN Encryption: " + JSON.stringify(r));
      const a = new n.PANJWE(t,r);
      var c = document.getElementById("cardInformation").value;
      i(c = JSON.parse(c), a).then(e=>{
        console.log("PANJW Encrypted Data: ", e);
        var t = document.getElementById("selectCardInput").value;
        (t = JSON.parse(t)).encryptedCard = e,
        document.getElementById("selectCardInput").value = JSON.stringify(t, void 0, 4)
      }
      )
    }, !1)
  }),
  $(function() {
    var e = document.querySelector("#addToEnrollAPIButtonDiscover");
    e && e.addEventListener("click", async function() {
      var e = document.getElementById("cardInformation").value;
      i(e = JSON.parse(e)).then(e=>{
        console.log("PANJW Encrypted Data: ", e);
        var t = document.getElementById("enrollCardInput").value;
        (t = JSON.parse(t)).encryptedCard = e,
        document.getElementById("enrollCardInput").value = JSON.stringify(t, void 0, 4)
      }
      )
    }, !1)
  }),
  $(function() {
    var e = document.querySelector("#addToCheckoutAPIButtonDiscover");
    e && e.addEventListener("click", async function() {
      const e = o.discover;
      var {kid: t, publicKey: r} = e;
      console.log("KID used for PAN Encryption: " + t),
      console.log("Public Key Used for PAN Encryption: " + JSON.stringify(r));
      const a = new n.PANJWE(t,r);
      var c = document.getElementById("cardInformation").value;
      i(c = JSON.parse(c), a).then(e=>{
        console.log("PANJW Encrypted Data: ", e);
        var t = document.getElementById("selectCardInput").value;
        (t = JSON.parse(t)).encryptedCard = e,
        document.getElementById("selectCardInput").value = JSON.stringify(t, void 0, 4)
      }
      )
    }, !1)
  }),
  $(function() {
    var e = document.querySelector("#addToEnrollAPIButtonMc");
    e && e.addEventListener("click", async function() {
      var e = document.getElementById("cardInformation").value;
      i(e = JSON.parse(e)).then(e=>{
        console.log("PANJW Encrypted Data: ", e);
        var t = document.getElementById("enrollCardInput").value;
        (t = JSON.parse(t)).encryptedCard = e,
        document.getElementById("enrollCardInput").value = JSON.stringify(t, void 0, 4)
      }
      )
    }, !1)
  }),
  $(function() {
    var e = document.querySelector("#addToCheckoutAPIButtonMc");
    e && e.addEventListener("click", async function() {
      const e = o.masterCard;
      var {kid: t, publicKey: r} = e;
      console.log("KID used for PAN Encryption: " + t),
      console.log("Public Key Used for PAN Encryption: " + JSON.stringify(r));
      const a = new n.PANJWE(t,r);
      var c = document.getElementById("cardInformation").value;
      i(c = JSON.parse(c), a).then(e=>{
        console.log("PANJW Encrypted Data: ", e);
        var t = document.getElementById("selectCardInput").value;
        (t = JSON.parse(t)).encryptedCard = e,
        document.getElementById("selectCardInput").value = JSON.stringify(t, void 0, 4)
      }
      )
    }, !1)
  })
}
]);
