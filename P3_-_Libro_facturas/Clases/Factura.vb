Public Class Factura
    Implements IComparable(Of Factura)

    'Atributos

    Private dtFFact As Date
    Private iCodFactura As Integer
    Private Shared iCodigoShared As Integer = -1
    Private oCli As Cliente
    Private oLineas As List(Of Linea)

    'Constructor
    Public Sub New(ByVal oC As Cliente)
        Me.oCli = oC
        Me.dtFFact = Now
        Me.oLineas = New List(Of Linea)

        Factura.iCodigoShared = Factura.iCodigoShared + 1
        Me.iCodFactura = Factura.iCodigoShared

    End Sub

    'Propiedades
    Public Shared ReadOnly Property SiguienteCodFactura() As Integer
        Get
            Return iCodigoShared + 1
        End Get
    End Property
    Public ReadOnly Property NumLineas() As Integer
        Get
            Return Me.oLineas.Count
        End Get
    End Property

    Public Property Cliente() As Cliente
        Get
            Return Me.oCli
        End Get

        Set(ByVal value As Cliente)
            Me.oCli = value
        End Set
    End Property

    Public ReadOnly Property CodigoFact() As Integer
        Get
            Return Me.iCodFactura
        End Get
    End Property

    Public Property FechaFact() As Date
        Get
            Return Me.dtFFact
        End Get

        Set(ByVal value As Date)
            Me.dtFFact = value
        End Set

    End Property

    Public ReadOnly Property IVA() As Double
        Get
            Dim dbTotal As Double

            For Each Linea As Linea In oLineas
                dbTotal = dbTotal + Linea.Total
            Next

            dbTotal = (dbTotal * 16 / 100)

            Return dbTotal

        End Get

    End Property

    Public ReadOnly Property Total() As Double
        Get

            Dim dbTotal As Double

            For Each Linea As Linea In oLineas
                dbTotal = dbTotal + Linea.Total
            Next

            Return dbTotal

        End Get
    End Property

    Public ReadOnly Property TotalConIva() As Double
        Get
            Dim dbTotal As Double

            For Each Linea As Linea In oLineas
                dbTotal = dbTotal + Linea.Total
            Next

            dbTotal = dbTotal + (dbTotal * 16 / 100)

            Return dbTotal

        End Get

    End Property

    'Métodos

    Sub AñadirLinea(ByVal oL As Linea)
        oLineas.Add(oL)
    End Sub


    Public Function CompareTo(ByVal other As Factura) As Integer Implements System.IComparable(Of Factura).CompareTo

        Return Me.iCodFactura.CompareTo(other.iCodFactura)

    End Function

    Public Overrides Function ToString() As String
        Dim sCad As String

        sCad = oCli.ToString & ControlChars.NewLine & ControlChars.NewLine
        sCad &= "FECHA DE FACTURA: " & Me.dtFFact.ToString.PadRight(20)
        sCad &= "CODIGO DE FACTURA: " & Me.iCodFactura & ControlChars.NewLine & ControlChars.NewLine

        sCad &= "------------------------------------------------------------------------" & ControlChars.NewLine
        sCad &= "DESCRIPCION".PadRight(20) & "PRECIO UNIT.".PadRight(20) & "UNIDADES".PadRight(20) & "TOTAL LINEA" & ControlChars.NewLine
        sCad &= "------------------------------------------------------------------------" & ControlChars.NewLine & ControlChars.NewLine

        For Each lin As Linea In oLineas
            sCad &= lin.ToString() & ControlChars.NewLine
        Next

        sCad &= ControlChars.NewLine & "------------------------------------------------------------------------" & ControlChars.NewLine

        sCad &= "".PadRight(50) & "TOTAL: " & Me.Total.ToString("0.00 Eur").PadLeft(20) & ControlChars.NewLine
        sCad &= "".PadRight(50) & "IVA: " & Me.IVA.ToString("0.00 Eur").PadLeft(22) & ControlChars.NewLine
        sCad &= "".PadRight(50) & "TOTAL CON IVA: " & Me.TotalConIva.ToString("0.00 Eur").PadLeft(12) & ControlChars.NewLine

        sCad &= "------------------------------------------------------------------------" & ControlChars.NewLine


        Return sCad
    End Function

    Public Function ListadoLineas() As String
        Dim sCad As String = ""

        'Incluyo formato de las lineas de detalle
        sCad = sCad & "DESCRIPCION".PadRight(25) & "PRECIO".PadRight(10) & "UNIDADES".PadRight(8) & Space(2)
        sCad = sCad & "TOTAL LINEA" & ControlChars.NewLine
        sCad = sCad & "---------------------------------------------------------" & ControlChars.NewLine
        For Each oL As Linea In Me.oLineas
            If TypeOf oL Is LProd Then
                sCad = sCad & CType(oL, LProd).ToString
            ElseIf TypeOf oL Is LServ Then
                sCad = sCad & CType(oL, LServ).ToString
            End If
            sCad &= ControlChars.NewLine
        Next

        Return sCad
    End Function
End Class
