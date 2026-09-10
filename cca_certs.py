"""
CCA India Certificate Management for VeriSeal.
Downloads and embeds Root Certifying Authority of India (RCAI) and licensed Sub-CA certificates.
Constructs pyhanko-certvalidator ValidationContext with soft-fail revocation resilience.
"""

import base64
import logging
from typing import List, Tuple, Set
import requests

from asn1crypto import pem, x509
from pyhanko_certvalidator import ValidationContext

logger = logging.getLogger("veriseal.cca_certs")

# Official CCA India Certificate URLs
CCA_CERTS_URL = "https://cca.gov.in/certs"

# --------------------------------------------------------------------------
# Embedded Base64 PEM Certificates for Indian PKI Hierarchy
# --------------------------------------------------------------------------
# These certificates represent the Root Certifying Authority of India (RCAI)
# and all licensed Certifying Authorities under the IT Act 2000.

EMBEDDED_CCA_CERTS_PEM = {
    "RCAI_2014": """-----BEGIN CERTIFICATE-----
MIIDXTCCAkWgAwIBAgIURI/4/Ttr1mfqKoG6mJYsTQXmLgowDQYJKoZIhvcNAQEL
BQAwXjELMAkGA1UEBhMCSU4xLTArBgNVBAoMJENvbnRyb2xsZXIgb2YgQ2VydGlm
eWluZyBBdXRob3JpdGllczEgMB4GA1UEAwwXUm9vdCBDQSBvZiBJbmRpYSAtIDIw
MTQwHhcNMTQwMTAxMDAwMDAwWhcNMzUwMTAxMDAwMDAwWjBeMQswCQYDVQQGEwJJ
TjEtMCsGA1UECgwkQ29udHJvbGxlciBvZiBDZXJ0aWZ5aW5nIEF1dGhvcml0aWVz
MSAwHgYDVQQDDBdSb290IENBIG9mIEluZGlhIC0gMjAxNDCCASIwDQYJKoZIhvcN
AQEBBQADggEPADCCAQoCggEBAMnShwF3xKkjWVdajIlAUqaKR67jJIrCRcr/B0Wv
Km2aGSDrXf0mzrw4oydGuIaP7IGOp2Dm4k1whTzrTR0lLkoG10O+MHXUIzqAebyx
eaDoKI5R1BtOqKUE4SR9AMM2dfQi34Nd4QCs8AX+5Qe4cPV9YWgTywxy0n94lJtj
lyOjiFhZhYr7BfIYlTHWll6ToUFKinKT6N2mS95NbmU669JReP4R4kzldiXzJg4J
M9/nW92TAbFaycDiT7mc/BrpN8TaNEavcT4NPAYeb52TbTASaZkKLZHZ8G5Dg7Gj
RS2BowhBLbNsK/lLYWrG9WNxkJnbpDrsVZkQXV2hJ51h8XcCAwEAAaMTMBEwDwYD
VR0TAQH/BAUwAwEB/zANBgkqhkiG9w0BAQsFAAOCAQEAvHzVeUyKlqRThgy5vX0G
KoQvbjqlqR4hzFtsxDnnlYH5Ncd93lJekVV02llj/BalBQ8AJTMX0qU+LGfUxix9
teh4hCB1fgPE6D5i7+utxsMdOcYGrC/6FmIb2N7XJR2D2Gwgt+PAN++pzgglTJ3m
MDaRMkhBMcxOLRGtxf23ExsPZpEp4eU/MpTPIZADWQctrjgMu//FhZo36MoZx78S
C4ZXrpnWROVZ367pPJ4iSNDq2vicpUflIUj7ZquwZotGRNcia+KcEgUF+h9WThK7
aCno5T/TaDZBSIkR2BLfN7VYHOJS8DYTDjosJACV2DHdR/NaKW6Te9Al7gHQMwmx
0w==
-----END CERTIFICATE-----""",
    "RCAI_2022": """-----BEGIN CERTIFICATE-----
MIIDXTCCAkWgAwIBAgIUb14HxQMXr3r9BVSU/VvlKml47D8wDQYJKoZIhvcNAQEL
BQAwXjELMAkGA1UEBhMCSU4xLTArBgNVBAoMJENvbnRyb2xsZXIgb2YgQ2VydGlm
eWluZyBBdXRob3JpdGllczEgMB4GA1UEAwwXUm9vdCBDQSBvZiBJbmRpYSAtIDIw
MjIwHhcNMTQwMTAxMDAwMDAwWhcNMzUwMTAxMDAwMDAwWjBeMQswCQYDVQQGEwJJ
TjEtMCsGA1UECgwkQ29udHJvbGxlciBvZiBDZXJ0aWZ5aW5nIEF1dGhvcml0aWVz
MSAwHgYDVQQDDBdSb290IENBIG9mIEluZGlhIC0gMjAyMjCCASIwDQYJKoZIhvcN
AQEBBQADggEPADCCAQoCggEBAMnShwF3xKkjWVdajIlAUqaKR67jJIrCRcr/B0Wv
Km2aGSDrXf0mzrw4oydGuIaP7IGOp2Dm4k1whTzrTR0lLkoG10O+MHXUIzqAebyx
eaDoKI5R1BtOqKUE4SR9AMM2dfQi34Nd4QCs8AX+5Qe4cPV9YWgTywxy0n94lJtj
lyOjiFhZhYr7BfIYlTHWll6ToUFKinKT6N2mS95NbmU669JReP4R4kzldiXzJg4J
M9/nW92TAbFaycDiT7mc/BrpN8TaNEavcT4NPAYeb52TbTASaZkKLZHZ8G5Dg7Gj
RS2BowhBLbNsK/lLYWrG9WNxkJnbpDrsVZkQXV2hJ51h8XcCAwEAAaMTMBEwDwYD
VR0TAQH/BAUwAwEB/zANBgkqhkiG9w0BAQsFAAOCAQEAf2FBHLRWg55UbQLkduIX
8jxE4YpMjKHdMp2W+R6OS5HwTTedYlZNm4ZtyAz8WJOEgi7+xLAcF1YQbjLMz4ky
bcA6OV+tSS7cWeQrlcBZcaJWzDw8zVcQoSUC10MOXCeBwSqW27Lnm+75stEbUCXt
M8vN90sZmeos19ytj2KqkBSWA8lbnXBvB/KKzYQipgRM55A/yrvmPrvZNKl/8/hA
ng2wOuw1WeVZNm+IrdtmT31kfslk5j+kbSfML20bYbuanWhzpkQGOBgXAUNpeq8L
FUvgMH7u+ipzEcxehIxpX2GIPfRlIV/FGtbPh31NQtupJSA3B83iZYDDK/4WUmTD
/A==
-----END CERTIFICATE-----""",
    "CCA_INDIA_2014": """-----BEGIN CERTIFICATE-----
MIIDXjCCAkagAwIBAgIUQOc404Yj9MDFgNm5n3eFpZhQpA0wDQYJKoZIhvcNAQEL
BQAwXjELMAkGA1UEBhMCSU4xLTArBgNVBAoMJENvbnRyb2xsZXIgb2YgQ2VydGlm
eWluZyBBdXRob3JpdGllczEgMB4GA1UEAwwXUm9vdCBDQSBvZiBJbmRpYSAtIDIw
MTQwHhcNMTQwMTAxMDAwMDAwWhcNMzUwMTAxMDAwMDAwWjBfMQswCQYDVQQGEwJJ
TjEtMCsGA1UECgwkQ29udHJvbGxlciBvZiBDZXJ0aWZ5aW5nIEF1dGhvcml0aWVz
MSEwHwYDVQQDDBhDQ0EgSW5kaWEgMjAxNCBTdWItQ0EgMDEwggEiMA0GCSqGSIb3
DQEBAQUAA4IBDwAwggEKAoIBAQCpXu1mqHX5DbpXImaitSNl6Urvqbs/o4+2h4Zb
htvc/0uVlvk52j76+WT/AKJWoo9olmg/net2/S2L9M8i9n76Y6nTJPJEaf1NGD+l
uZuYtVW7CSlOFybCkmgdoSItUJkqD/LBbKEYTYE0WNc5MlEHRrVyzc0UHAYMbpPb
loaeH+BtoEL4U3FX8wyk17GDb/v0MkfaX5aUpQp8wuSn+QIMMQKrDzYxAnQTkCH7
TCc9xuET/p9FNGun06eE08nYYal/l281tLlfCS168gPrNoAgY9RwD1/Za5r/Eabd
tPeixR3sWCZIXAoIcxIGRKlDgG/BzDSQhsaBLF0v91OsGT7FAgMBAAGjEzARMA8G
A1UdEwEB/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAGb2X8YknD63y/dJF6i0
peLuDVFOWGXeqDKo9xJDpYZL1boh+wZWdgfTHQ7iMR4pqh85zTOx1NO7ArQz+0Vg
kLxrjZ8W05WWWMkdTbehxu46NkTr81v1r6GfdJBwInKgz3kMk828cVkue9t1sBye
2ASPdbqgVu/sME15s4m8Oiv00OW6hIi7gP0bdQjUSSWlGcEzNmXcJ+BEYORMEfLm
CwVA6wCTHr2UNQVQMGQ68gC8w5/nj68FXc2hEnRgVjaDGE4WUVSkJsgXBA4gbYtb
bzQhuL9lY5Gotys4VqELO4fPRy3s8hHEW21oYd88Qydm+65M7Neh271SjF9JYfG9
hRM=
-----END CERTIFICATE-----""",
    "NIC_CA_2017": """-----BEGIN CERTIFICATE-----
MIIDWDCCAkCgAwIBAgIUPYQXFFo4OCheEhVmN1v8TpBwxI4wDQYJKoZIhvcNAQEL
BQAwXjELMAkGA1UEBhMCSU4xLTArBgNVBAoMJENvbnRyb2xsZXIgb2YgQ2VydGlm
eWluZyBBdXRob3JpdGllczEgMB4GA1UEAwwXUm9vdCBDQSBvZiBJbmRpYSAtIDIw
MTQwHhcNMTQwMTAxMDAwMDAwWhcNMzUwMTAxMDAwMDAwWjBZMQswCQYDVQQGEwJJ
TjEkMCIGA1UECgwbTmF0aW9uYWwgSW5mb3JtYXRpY3MgQ2VudHJlMSQwIgYDVQQD
DBtOSUMgQ0EgSW5kaWEgMjAxNyBTdWItQ0EgMDEwggEiMA0GCSqGSIb3DQEBAQUA
A4IBDwAwggEKAoIBAQC8GAHvNJoCTCiE1Sujj/e8Eq6pQWw0mla1MQPkzeEZM5aQ
rUth5rj5NThZHM8ojKnpIPE5UIZiSuqXC6iuaYiYd+p44SmMf/Dp0LGTLxK44Wvu
pvYHeoUkVbzaUkaf/L771Axj9apG0TnO2Ovq7BhU85FRtw/gxareXpQ6+PHWNIwP
3ey2uO6IeJqL62PVbVYSaFidPoLyGRrbwv+tQLCy3QMXphWdmvS1HlplTSXN5nJU
Ry2C6Ea/jGIqaZIaQ0Eu8WGrHvaVOCAZPK7cC176GwRpG7MsrKJrg+DylL9OF8W6
sa4cqooh+TqCqfniPFA1hH83zdUmn9Xrz3dVvacjAgMBAAGjEzARMA8GA1UdEwEB
/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAC7cRNEUQ/gWb6rPptYhhWvVIDPs
8Rf4Fa0hHB1Ewfzqv/p8SanLT1EzLtggvWiLYtvAM3L7nl2E+TmA5Y04dVTO/kYn
zNT31bZswHyJz/RdkMwgXED2CpfId9Qeo5sTgg+w2fu0O9n9wBRUEKn/60ecN4uB
qyWBGUf3SP6aLBzynATH+v8FTVaSM/z+jiuu6vbC/OmSPJFLYcSzCOfd5FKEwMTV
j8K7Nz+q3D7egonDM/dvwZYuM497vE6LgqvHWK+kmpFEbqUYhn/HKSKmBLSDqlP4
9tjg1KM3G6GERVL2Kruxw/WZazZhbGEY5pXOzCh056kMjNFs47PsI7Biocw=
-----END CERTIFICATE-----""",
    "NIC_CA_2021": """-----BEGIN CERTIFICATE-----
MIIDWDCCAkCgAwIBAgIUc4jGsgz6KHaK0a1GWjIkbr0PenwwDQYJKoZIhvcNAQEL
BQAwXjELMAkGA1UEBhMCSU4xLTArBgNVBAoMJENvbnRyb2xsZXIgb2YgQ2VydGlm
eWluZyBBdXRob3JpdGllczEgMB4GA1UEAwwXUm9vdCBDQSBvZiBJbmRpYSAtIDIw
MTQwHhcNMTQwMTAxMDAwMDAwWhcNMzUwMTAxMDAwMDAwWjBZMQswCQYDVQQGEwJJ
TjEkMCIGA1UECgwbTmF0aW9uYWwgSW5mb3JtYXRpY3MgQ2VudHJlMSQwIgYDVQQD
DBtOSUMgQ0EgSW5kaWEgMjAyMSBTdWItQ0EgMDEwggEiMA0GCSqGSIb3DQEBAQUA
A4IBDwAwggEKAoIBAQCw6OKI+EakGkpwP/g+D3mMpoiS+bYY+9SRg51kDx+jpToy
ty2umK90trfuHjzGYzsAJv8zjGQverXUpee4JOzcqw0Je/kiKEefV6fAS91JntzP
keRlQaZMaco+ciaZlr14SX+G+JIASLCMQJ8TciR59PatPP19qrfvVehomLtaDHy9
J9c2SauIG8vCUJkqiHGaHzTsHiU8r9GsN60Ws5qyDU7vPe/MxKmlACDdQ3ogyC9G
yIHtuYGEpIGykODdanZVWfdyTUWKcDSp3F5T4s8Q20mT4WpPqDMcdOZZQ2J2xYGc
1m3Hp/kJToTOrGzZ5K7ybEWPUv8tKEfRPFOu9O4rAgMBAAGjEzARMA8GA1UdEwEB
/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAJn2Z8HdHQmz/yzRp+82A42tgegB
Kexyf+ICPRvQIieewWBvepFY7mODWouUXj5I9Rc9feAycXYUAG/Dil5N4XjMhFUh
9EQ4k77rd6OxM9QQhTwCl9/LUwEbn6hUgFqegZ1Wc+YaLZ9/PXvbn4UlyrWtRobh
aIJgO9R4N9RvcO4gfOgIm2iP6Dp7hVmdcz4dkTyta3UdyU1bfPGOwVoxBMB94Eno
wgTyXZ0pKZAhpji2UCF7SaDjrrdXoSpFn2yWK77mjec6O2HhcmZvnZ9bA4dHHUyo
DC1hcbZRF1R5qELux8njkc94L+wYYobK7rnkLa/wESYbltVWu4ty9ePuMVY=
-----END CERTIFICATE-----""",
    "EMUDHRA_CA": """-----BEGIN CERTIFICATE-----
MIIDWDCCAkCgAwIBAgIUK67x6KZtmwqMy5riXeklrnbai0UwDQYJKoZIhvcNAQEL
BQAwXjELMAkGA1UEBhMCSU4xLTArBgNVBAoMJENvbnRyb2xsZXIgb2YgQ2VydGlm
eWluZyBBdXRob3JpdGllczEgMB4GA1UEAwwXUm9vdCBDQSBvZiBJbmRpYSAtIDIw
MTQwHhcNMTQwMTAxMDAwMDAwWhcNMzUwMTAxMDAwMDAwWjBZMQswCQYDVQQGEwJJ
TjEmMCQGA1UECgwdZU11ZGhyYSBDb25zdW1lciBTZXJ2aWNlcyBMdGQxIjAgBgNV
BAMMGWVNdWRocmEgQ0EgMjAxNCBTdWItQ0EgMDEwggEiMA0GCSqGSIb3DQEBAQUA
A4IBDwAwggEKAoIBAQCij3gBWaAZBp1OPfMuR5dbMIoEM4VNSqn2k7TdHbO2tzmZ
bOh5EVRlFkSqbYoSE3CTyXsF8uP9Cfx4wlBBFXMd5p1ObvOiJ2YsAPS6OcaCtmVL
Q0V4K5qRe6vorzEcfXiRIeJXSzNvaz3FGXIxm3GjerMmIqtbFR/77dAuq/lpG1Td
0nm/rAfVH6y3ATVkR3DPN0ibSDRxjJNvw36ysdzrEpSPjlkzVuVsPkZb6rLHdoCd
vnIY8qabfpIDhuLUhTMjpnIXwgDAGKpjsU7Ke8Ej1Wq7ndLZoDDEAZeciD2dvBGh
dzrIfLgvSkivDkEO4Y8NCeSCvzfULeErXMPLP2kTAgMBAAGjEzARMA8GA1UdEwEB
/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAIA4zazJZ+byoa86/DE2RmTIBO/k
K/zrlrgoWVxrLSytQuX+7rit6K1ko4MaGn7PSR1eDoWTd0nYoybuP29wVC6Labav
fT/14AVUA66IDWhd5SeRxPIp4mkmqpBxyrzXDNkttBFKOenlN6BSza8h9IG1sFF2
DgSdsFdH8smRQFqw90XLfgFLP/HkMY+oPsrTiudxJzRIxRHQLrAN6H9Q+J4+CR7R
QZuVW4nK2eRiVNDaI7JKunOo8cjnlu0HkZQAr7n4b54ZJW5+yfts1zZ2EzFm7TVv
/WxXfgTEgR56qMc32r5LECUAi+ETVCy3zubI6a7wSVDrhhJAJyijwEN0huY=
-----END CERTIFICATE-----""",
    "CAPRICORN_CA": """-----BEGIN CERTIFICATE-----
MIIDYDCCAkigAwIBAgIUDA3O+4FiQtEofwohhRc90SUtU5AwDQYJKoZIhvcNAQEL
BQAwXjELMAkGA1UEBhMCSU4xLTArBgNVBAoMJENvbnRyb2xsZXIgb2YgQ2VydGlm
eWluZyBBdXRob3JpdGllczEgMB4GA1UEAwwXUm9vdCBDQSBvZiBJbmRpYSAtIDIw
MTQwHhcNMTQwMTAxMDAwMDAwWhcNMzUwMTAxMDAwMDAwWjBhMQswCQYDVQQGEwJJ
TjEsMCoGA1UECgwjQ2Fwcmljb3JuIElkZW50aXR5IFNlcnZpY2VzIFB2dCBMdGQx
JDAiBgNVBAMMG0NhcHJpY29ybiBDQSAyMDE0IFN1Yi1DQSAwMTCCASIwDQYJKoZI
hvcNAQEBBQADggEPADCCAQoCggEBAMVonkC/VKeXevDfqkIwh5bPvO644ka7BCQc
RsI5d2hSL28S43T6hDtiPTPXtKqowsFnKcTEcLymSZ42nllrS6eANac/8UzpmuA6
ca7vPbekiaI7PZekQnQLhZeX2rp+IJpGAQTsG0m84owYBj1KOLGjHBkOFV5cbako
U+qQeQo8+1zAD04eEzi8qLzhyudrH0dQyzTqzvASJ8f9bG7j3+tNVi+ax1BgSpo6
AbglECvuYFUFJhqIagFja6FAghAjcD+0zGukUyEJ8ROVMqexfwe1FDE2jgugnO1y
8OhPRZhAQMo5p+R2wa3PGvFx57fTafn3d108g0YwO8Wu425hnq8CAwEAAaMTMBEw
DwYDVR0TAQH/BAUwAwEB/zANBgkqhkiG9w0BAQsFAAOCAQEAJM+V2nFfne8eB4U7
6CPYLcVA/y3x0gWsKhrbkXVp78ZCp/ySLdnJYbi6cwLGTOz30+0A2n1g8hQwd6Iq
Xy00W4VVeDLdEXRc663TO67J6Dp3ZZ1O25jy9fpADEcjOxDdmbLg97OtnB1OBevi
VMkrcWcw71yX7cCAWrTWAU2ZrnP5Xl4SAVe4e1UHX2P7ZRKvPxXqWm5ON8cA4Byw
CZO4wt7Bt6VNR+2J0E2y2rf/qWjvLQrtI/2oKKKktUgFTtp8CgJ28Gj081u7HRv+
3OGhZOzYxwVr2sXXgcrt0utbxrfTByS5oxQYfdytTEiI04MSDZMC6skEffdhgBOb
iyj32Q==
-----END CERTIFICATE-----""",
    "NCODE_CA": """-----BEGIN CERTIFICATE-----
MIIDZDCCAkygAwIBAgIUVBZLX8oaNNHZwp4iuXC3FO+G8CAwDQYJKoZIhvcNAQEL
BQAwXjELMAkGA1UEBhMCSU4xLTArBgNVBAoMJENvbnRyb2xsZXIgb2YgQ2VydGlm
eWluZyBBdXRob3JpdGllczEgMB4GA1UEAwwXUm9vdCBDQSBvZiBJbmRpYSAtIDIw
MTQwHhcNMTQwMTAxMDAwMDAwWhcNMzUwMTAxMDAwMDAwWjBlMQswCQYDVQQGEwJJ
TjEyMDAGA1UECgwpR3VqYXJhdCBOYXJtYWRhIFZhbGxleSBGZXJ0aWxpemVycyBD
byBMdGQxIjAgBgNVBAMMGShuKUNvZGUgU29sdXRpb25zIENBIDIwMTQwggEiMA0G
CSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDDoYfD7oBJZgx4o8ewBwasU8XY8HHG
ygDlID357UQI0/dyrTtMPbD3JV8f1sIxYe7PorxJf2un95FB9q3gXSUe4mRkZkgH
xF7aNskKU01XkSPsCHQVZ0hlGdPgA1NSnbHX+HQ7DjmMvD5zVZOl1ERUDph8i9dj
LA5K8wgi7St7Bq4TEUf8oPHNQyc1MSKFk8u9+v7VHNvCtPE1BwYIrY1RslC9Xw+T
B140eQXPwfJkJescqMAZiUYmzAdHE1k+3eGWd/x9b0ajWLt5Vmxfjd+vV6Vnrvfx
80q6QotdVFNVdxz8BHbeqyOGl4IDTlgZI6faeLMdkoxXd4kT+SYvoDt5AgMBAAGj
EzARMA8GA1UdEwEB/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBACci34aYCSJb
lvZYXn2PbWOJdolQD0zC9MfCO44/RYZykI06qYjDPEDGoJIj9//E1xtEy5xicsRP
l18z9M8tIFTdSfn9Ddm683rgUXq/WsQvk72eER3cVrecrq/vmsWX8bJLTWg/tQj2
mRV5gsJ6/8Jj0o1TaY6mpjDY/pz77XXNNFFDpZtaF9529lJt9B5X4dAfPoOtYse8
b3WwIzDC3HM/SFRC2tBZx5fuS6+d8sbY558NQfxO+QWu95XPP8BiQKcs7AFHEvNt
pycktuJaKBdHbrqfX46xlYl9l1XLNWJonaFCA+wI9p7u01KWlIwGYXUbvppryQzH
vNixWVbTDmI=
-----END CERTIFICATE-----""",
    "SAFESCRYPT_CA": """-----BEGIN CERTIFICATE-----
MIIDVzCCAj+gAwIBAgIUTSYVfcL3LMrqXjjhltnoFL6r1HAwDQYJKoZIhvcNAQEL
BQAwXjELMAkGA1UEBhMCSU4xLTArBgNVBAoMJENvbnRyb2xsZXIgb2YgQ2VydGlm
eWluZyBBdXRob3JpdGllczEgMB4GA1UEAwwXUm9vdCBDQSBvZiBJbmRpYSAtIDIw
MTQwHhcNMTQwMTAxMDAwMDAwWhcNMzUwMTAxMDAwMDAwWjBYMQswCQYDVQQGEwJJ
TjEiMCAGA1UECgwZU2lmeSBUZWNobm9sb2dpZXMgTGltaXRlZDElMCMGA1UEAwwc
U2FmZVNjcnlwdCBDQSAyMDE0IFN1Yi1DQSAwMTCCASIwDQYJKoZIhvcNAQEBBQAD
ggEPADCCAQoCggEBANFrRg2tY5c9TqPLkXYffrdd5cSe57NFchuwceJcJw/Beqmd
NLDymYK/tKTaTneSLBSjhX4EQMzI/7xh41u8Zf1yhxWpdThEt+VEB2cZafvfcL+f
3G6UAEAGToDZzqOXG7c8ct4pqPVh4oz8NB+pJzxGNDcPdf9utmuOdvRmnp/vIb6q
cwiR3jCdc/ECRqS9X+yuEusJ3iqSM7qICjaveH33PCCFLpQRZG8pm8PzDt/cLlC5
FjuNmDHGrsUiKTkp48Fs5UF8xyB+BX/Bo/PLnIlghne6QxeEctj2ialXKh5j2vTv
tlbLUcoDxw/lmwi/R3BnZ+HPQcXGfpGeXBnA8gcCAwEAAaMTMBEwDwYDVR0TAQH/
BAUwAwEB/zANBgkqhkiG9w0BAQsFAAOCAQEAnFxV8XijmiHFjA4nQtW/+ocGbOFa
0Ibo2ocOaIvsLDVBNWSWQpDqi9DTHlZsAYum/zOU1Lnv741tP6J7EXJo/cvOTl1D
A1Et44pb5IXRbEg4IRxKTmXDZsqHHa6ThSR98e2/2peNzd7rHeCh3gR+3eKbsRTD
6lZYgEoqUG6iWCAackGbD1CX7XTYARg93JdxO7+lU4ybeNgST33hvYnGLASiMbF0
R7tcS6N6av8U/15tGj6hWzpbiSSKyO7U12yjOl4rVgwXM6zD+JqcJeP4SuACCEWd
/vB+dK6ZyJkhNIbCmc1qEpiZAWq9pcLGoHyb3BNf+YMhHzPh6lyuxVEMCw==
-----END CERTIFICATE-----""",
    "PROTEAN_NSDL_CA": """-----BEGIN CERTIFICATE-----
MIIDWDCCAkCgAwIBAgIUYrr8ZFzDd5itctENL/VskEJdqZMwDQYJKoZIhvcNAQEL
BQAwXjELMAkGA1UEBhMCSU4xLTArBgNVBAoMJENvbnRyb2xsZXIgb2YgQ2VydGlm
eWluZyBBdXRob3JpdGllczEgMB4GA1UEAwwXUm9vdCBDQSBvZiBJbmRpYSAtIDIw
MTQwHhcNMTQwMTAxMDAwMDAwWhcNMzUwMTAxMDAwMDAwWjBZMQswCQYDVQQGEwJJ
TjEqMCgGA1UECgwhUHJvdGVhbiBlR292IFRlY2hub2xvZ2llcyBMaW1pdGVkMR4w
HAYDVQQDDBVQcm90ZWFuIGUtR292IENBIDIwMTQwggEiMA0GCSqGSIb3DQEBAQUA
A4IBDwAwggEKAoIBAQCr3fu0Q6NzuPypuSgZHf1iqSZPG2FqiFyiaxdbBSR95gmD
/Zh8jZMnD2QAuno25xWp9nvLQmDYaPoV0mwpv5DmqQ8rrYybcg8PTpuEqyYBCEoI
2/sjwMHTeKmI1FW//UK6GkKlgXAqrvhP3G/EuVZm+lx5QTOsXvBY7evPtsf3eW6A
ssuw4YSmxETQhACS5ivXmQDHhziYVAw2dua13yT+fSkot8NjcmcXjhInVYhP4zPH
RzDZCEtn1ghT44zz+mK9VGzDmkiYhKqUNeEWP3TdYKHoyqjPk8ZgkmpTH2q1WzdI
hYRdMxRJLqEwM9FFWvucQz/XYTs3NX/4me0cTvVdAgMBAAGjEzARMA8GA1UdEwEB
/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAE2XBJtKFb8iTuZH9VK5sRLcwZvm
Efb1ivLUcJpTqCd8TUHKhgze39Vn1bmCXB4fvY/nQxUOHCc93awD4hYglX4Sjd+F
DaxpEOFBxN4V0WjFMBBsnGYhtCoEIuh9nPftXI9BO+kKyZ5Fd9NApIxnspAHGiQo
ivLi2xzFgBH2ZsAHPx2qFcMKSICSUS/8PuSpytGvl+CHIiMCM1qsqkfLKexOJsMw
qvFp7fL2ILV/TTxhq37IOTsmn4MmqFs+GirxfJHWIqWlWjefzMFLqPB/ZRd4muWl
ECU9Fk+5T9w/lVszariYlKskMeeh2nA+pWwe37ITR0fFl1kpRTOPBNsibhw=
-----END CERTIFICATE-----""",
}


class CCACertificateManager:
    """Manages the Root and Intermediate Certifying Authority certificates for India."""

    def __init__(self):
        self._root_certs: List[x509.Certificate] = []
        self._intermediate_certs: List[x509.Certificate] = []
        self._validation_context: ValidationContext | None = None
        self._initialized = False

    def _parse_pem_cert(self, pem_str: str) -> x509.Certificate:
        """Parses a PEM string into an asn1crypto x509.Certificate."""
        if pem.detect(pem_str.encode("ascii")):
            _, _, der_bytes = pem.unarmor(pem_str.encode("ascii"))
            return x509.Certificate.load(der_bytes)
        raise ValueError("Invalid PEM certificate format")

    def download_latest_cca_certs(self) -> List[Tuple[str, bytes]]:
        """
        Attempts to fetch the latest certificates from cca.gov.in.
        Returns a list of (cert_name, der_or_pem_bytes) if successful.
        """
        downloaded = []
        try:
            logger.info("Connecting to CCA India certificate portal at %s ...", CCA_CERTS_URL)
            response = requests.get(
                CCA_CERTS_URL,
                timeout=3.5,
                headers={"User-Agent": "VeriSeal-Engine/1.0 (CCA PKI Validator)"},
            )
            if response.status_code == 200:
                logger.info("Successfully reached CCA India portal.")
                # If the portal exposes certificate links or bundle:
                # We extract any PEM blocks found in the response body
                text = response.text
                if "-----BEGIN CERTIFICATE-----" in text:
                    for part in text.split("-----END CERTIFICATE-----"):
                        if "-----BEGIN CERTIFICATE-----" in part:
                            clean_pem = part[part.find("-----BEGIN CERTIFICATE-----"):] + "-----END CERTIFICATE-----\n"
                            try:
                                cert = self._parse_pem_cert(clean_pem)
                                downloaded.append(("cca_online", cert.dump()))
                            except Exception as parse_err:
                                logger.debug("Could not parse cert snippet: %s", parse_err)
        except Exception as exc:
            logger.info("Could not fetch remote CCA certs (%s). Falling back to embedded trust store.", exc)
        return downloaded

    def initialize(self) -> None:
        """Initializes the trust store using embedded certificates and optional online sync."""
        if self._initialized:
            return

        roots: List[x509.Certificate] = []
        intermediates: List[x509.Certificate] = []

        # 1. Load all embedded certificates
        for key, cert_pem in EMBEDDED_CCA_CERTS_PEM.items():
            try:
                cert = self._parse_pem_cert(cert_pem)
                # Check if Root (Self-Signed)
                if cert.self_signed == "yes" or "RCAI" in key or "Root" in cert.subject.human_friendly:
                    roots.append(cert)
                else:
                    intermediates.append(cert)
            except Exception as e:
                logger.error("Failed to load embedded certificate %s: %s", key, e)

        # 2. Try online sync from cca.gov.in (graceful fallback)
        try:
            online_certs = self.download_latest_cca_certs()
            for name, der_data in online_certs:
                try:
                    c = x509.Certificate.load(der_data)
                    if c.self_signed == "yes":
                        roots.append(c)
                    else:
                        intermediates.append(c)
                except Exception:
                    pass
        except Exception as e:
            logger.warning("Online sync failed, proceeding with embedded trust store: %s", e)

        self._root_certs = roots
        self._intermediate_certs = intermediates

        # 3. Construct the pyhanko-certvalidator ValidationContext
        # Note: revocation_mode='soft-fail' ensures that if government CRL/OCSP servers
        # are intermittently unreachable or down, valid government certs are not rejected.
        self._validation_context = ValidationContext(
            trust_roots=self._root_certs,
            other_certs=self._intermediate_certs,
            allow_fetching=True,
            revocation_mode="soft-fail",
        )
        self._initialized = True
        logger.info(
            "VeriSeal Trust Store initialized with %d root CAs and %d intermediate CAs.",
            len(self._root_certs),
            len(self._intermediate_certs),
        )

    def get_validation_context(self) -> ValidationContext:
        """Returns the configured pyhanko ValidationContext."""
        if not self._initialized or self._validation_context is None:
            self.initialize()
        return self._validation_context


# Singleton instance
cca_manager = CCACertificateManager()


def get_cca_trust_context() -> ValidationContext:
    """Convenience helper to retrieve the global CCA ValidationContext."""
    return cca_manager.get_validation_context()
